var express = require('express');
var User = require('../model/User');
var JsonResult = require('../dto/JsonResult');
var jwt = require('jsonwebtoken');
var router = express.Router();

var secret = "yunsenlin_key";
var reg = /^[1][35678][0-9]{9}$/;

//暂时的验证码
router.get('/phoneCode',function(req,res,next){
  res.json(JsonResult(200,"返回手机验证码",getPhoneCode()));
});

function getPhoneCode() {
  var m = 9999;
  var n = 1000;
  var w = m - n;
  return parseInt(Math.random()*w+n, 10);
}

router.post('/login',function(req,res,next){

  //参数验证
  if (!reg.test(req.body.phone)){
    res.json(JsonResult(400,"手机号码不规范",null));
    return;
  }

  var phone = req.body.phone;
  var password = req.body.password;

  User.findOne({
    where:{
      phone : phone,
      password : password
    }
  }).then(function(result){

    if (result != null){
      var token = jwt.sign({
        id : result.id,
        phone : phone
      },secret,{expiresIn:'7d'});

      res.json(JsonResult(200,"登录成功",token));
    }else {
      res.json(JsonResult(403,"用户不存在或密码错误",null));

    }

  }).catch(function(err){

    console.log("登录失败，数据库查询错误");
    res.json(JsonResult(500,"登录失败，数据库查询错误",err));

  });

});

/**
 * 注册
 */
router.post('/register',function(req,res,next){

  if (!reg.test(req.body.phone)){
    res.json(JsonResult(400,"手机号码不规范",null));
    return;
  }

  if (req.body.code == null || req.body.code == ""){
    res.json(JsonResult(403,"验证码为空或错误",null));
    return;
  }

  var phone=req.body.phone;
  var password=req.body.password;

  User.findOne({
    where:{
      phone : phone
    }
  }).then(function(result) {

    if (result != null) {
      res.json(JsonResult(403, "用户已存在", null));
    }else {

      User.create({
        phone : phone,
        password : password
      }).then(function(result){

        var token = jwt.sign({
          id : result.id,
          phone : result.phone
        },secret,{expiresIn:'7d'});

        res.json(JsonResult(200,"注册成功",token));

      }).catch(function(err){

        console.log("注册失败，数据库有插入错误");
        res.json(JsonResult(500,"注册失败，数据库有插入错误",err));

      });
    }
  });

});

router.post('/modifyPsd',ensureAuthorized,function(req,res,next){
  var id = req.decoded.id;
  var old_psd = req.body.old_psd;
  var new_psd = req.body.new_psd;

  User.findOne({
    where:{
      id : id,
      password : old_psd
    }
  }).then(function(result){

    if (result != null){

      User.update({
        password : new_psd
      },{
        where:{
          id : id
        }
      }).then(function(result){
        console.log(result);
        res.json(JsonResult(200,"修改成功",null));
      }).catch(function(err){

        console.log("修改失败，数据库修改错误");
        res.json(JsonResult(500,"修改失败，数据库修改错误",err));

      });

    }else {
      res.json(JsonResult(403,"密码错误",null));
    }

  });
});

function ensureAuthorized(req, res, next) {
  if (req.get("Authorization") != null) {

    jwt.verify(req.get("Authorization"), secret, function(err, decoded) {
      if (err) {
        res.json(JsonResult(403,"token无效或失效",err));
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.json(JsonResult(401,"用户未登录",null));
  }
}

module.exports = router;
