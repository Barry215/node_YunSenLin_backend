/**
 * Created by frank on 17/2/16.
 */
var express = require('express');
var UserDao = require('../dao/UserDao');
var JsonResult = require('../dto/JsonResult');
var jwt = require('jsonwebtoken');
var Result = require('../dto/Result');
var secret = "yunsenlin_key";

function createToken(phone) {
    return jwt.sign({
        phone : phone
    },secret,{expiresIn:'7d'});
}


function verifyToken(token) {
    try {
        var decoded = jwt.verify(token, secret);
        return Result(true,decoded);
    } catch(err) {
        return Result(false,err);
    }
}

function verifyAuthorized(req, res, next) {
    var token = req.get("Authorization");
    if (token != null) {
        var verify_result = verifyToken(token);
        if (verify_result.success){
            UserDao.validateUserExist(verify_result.data.phone).then(function (exist_result) {
                if (exist_result.token == token){
                    req.user = exist_result;
                    next();
                }else {
                    res.json(JsonResult(403,"token已失效",null));
                }
            }).catch(function (err) {
                res.json(JsonResult(500,"数据库查找用户发生错误",err));
            });
        }else {
            res.json(JsonResult(403,"token无效或失效",verify_result.data));
        }
    } else {
        res.json(JsonResult(401,"您未登录，请先登录",null));
    }
}

module.exports = {
    createToken : createToken,
    verifyToken : verifyToken,
    verifyAuthorized : verifyAuthorized
};