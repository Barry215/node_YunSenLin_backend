var express = require('express');
var JsonResult = require('../dto/JsonResult');
var LoginInfo = require('../dto/LoginInfo');
var UserBaseInfo = require('../dto/UserBaseInfo');
var UserDao = require('../dao/UserDao');
var PhoneService = require('../service/PhoneService');
var TokenService = require('../service/TokenService');
var co = require('co');
var router = express.Router();

/**
 * 发送验证码
 */
router.get('/phoneCode',function(req,res,next){
  res.json(JsonResult(200,"返回手机验证码",PhoneService.getPhoneCode()));
});

/**
 * 登录
 */
router.post('/login',function(req,res,next){

    if (!PhoneService.validatePhone(req.body.phone)){
        res.json(JsonResult(400,"手机号码不规范",null));
        return;
    }

    UserDao.getLoginResult(req.body.phone,req.body.password).then(function (login_result) {
        if (login_result != null){
            var token = TokenService.createToken(login_result.phone);
            UserDao.updateUserToken(login_result.id,token).then(function (update_result) {
                //update_result返回1
                res.json(JsonResult(200,"登录成功",LoginInfo(login_result,token)));
            }).catch(function (err) {
                res.json(JsonResult(500,"服务器更新Token发生错误",err));
            });
        }else {
            res.json(JsonResult(403,"用户不存在或密码错误",null));
        }
    }).catch(function (err) {
        res.json(JsonResult(500,"登录失败，数据库查询错误",err));
    });

});

/**
 * 注册
 */
router.post('/register',function(req,res,next){
    if (!PhoneService.validatePhone(req.body.phone)){
        res.json(JsonResult(400,"手机号码不规范",null));
        return;
    }

    if (PhoneService.validateCode(req.body.code)){
        res.json(JsonResult(403,"验证码为空或错误",null));
        return;
    }

    var phone = req.body.phone;
    var password = req.body.password;

    UserDao.validateUserExist(phone).then(function(exist_result) {
        if (exist_result != null) {
            res.json(JsonResult(403, "用户已存在", null));
        } else {
            var token = TokenService.createToken(phone);
            UserDao.createUser(phone,password,token).then(function (create_result) {
                //create_result返回插入的对象+id,没有其他属性
                res.json(JsonResult(200,"注册成功",{username:"未设置",is_sync:true,is_push:true,token:token}));
            }).catch(function (err) {
                res.json(JsonResult(500,"注册失败，数据库插入错误",err));
            });
        }
    }).catch(function(err){
        res.json(JsonResult(500, "数据库查询错误", err));
    });
});

/**
 * 修改密码
 */
router.post('/modifyPsd',TokenService.verifyAuthorized,function(req,res,next){
    var user = req.user;
    var old_psd = req.body.old_psd;
    var new_psd = req.body.new_psd;

    if (old_psd == user.password){
        UserDao.modifyUserPsd(user.phone,new_psd).then(function (modify_result) {
            res.json(JsonResult(200,"修改成功",null));
        }).catch(function (err) {
            res.json(JsonResult(500,"修改失败，数据库修改错误",err));
        });
    }else {
        res.json(JsonResult(403,"密码错误",null));
    }

});

/**
 * 找回密码
 */
router.post('/findPsd',function(req,res,next){
    var phone = req.body.phone;
    var code = req.body.code;
    var new_psd = req.body.new_psd;

    if (!PhoneService.validatePhone(phone)){
        res.json(JsonResult(400,"手机号码不规范",null));
        return;
    }

    if (PhoneService.validateCode(code)){
        res.json(JsonResult(403,"验证码为空或错误",null));
        return;
    }

    UserDao.validateUserExist(phone).then(function (exist_result) {
        if (exist_result != null){
            var token = TokenService.createToken(phone);
            UserDao.resetUserPsd(phone,new_psd,token).then(function (reset_result) {
                res.json(JsonResult(200,"密码找回成功",LoginInfo(exist_result,token)));
            }).catch(function (err) {
                res.json(JsonResult(500,"修改失败，数据库修改错误",err));
            });
        }else {
            res.json(JsonResult(403,"该手机用户不存在",null));
        }
    }).catch(function (err) {
        res.json(JsonResult(500, "数据库查询错误", err));
    });
});

/**
 * 验证Token
 */
router.get('/verifyToken',TokenService.verifyAuthorized,function(req,res,next){
    res.json(JsonResult(200,"token有效",null));
});

/**
 * 请求用户基础信息
 */
router.get('/getUserBaseInfo',TokenService.verifyAuthorized,function(req,res,next){
    var user = req.user;
    res.json(JsonResult(200,"返回用户信息成功",UserBaseInfo(user)));
});

module.exports = router;
