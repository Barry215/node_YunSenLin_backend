var express = require('express');
var sequelize = require('../db/Sequelize');
var JsonResult = require('../dto/JsonResult');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/login',function(req,res,next){

  //参数验证

  var username=req.body.username;

  var password=req.body.password;

  console.log("Username = "+username+", password = "+password);

  var user_token = username+new Date();

  var token = md5(user_token);

  res.json(JsonResult(200,"success",null));

});

router.post('/register',function(req,res,next){

  //参数验证

  var username=req.body.username;

  var password=req.body.password;

  console.log("Username = "+username+", password = "+password);

  res.json(JsonResult(200,"success",null));

});


module.exports = router;
