var express = require('express');
var JsonResult = require('../dto/JsonResult');
var LoginInfo = require('../dto/LoginInfo');
var UserBaseInfo = require('../dto/UserBaseInfo');
var UserDao = require('../dao/UserDao');
var BillDao = require('../dao/BillDao');
var PhoneService = require('../service/PhoneService');
var TokenService = require('../service/TokenService');
var QiniuService = require('../service/QiniuService');
var sequelize = require('../db/Sequelize');
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
            res.json(JsonResult(404,"该手机用户不存在",null));
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
 * 获取用户基础信息
 */
router.get('/getUserBaseInfo',TokenService.verifyAuthorized,function(req,res,next){
    var user = req.user;
    res.json(JsonResult(200,"返回用户信息成功",UserBaseInfo(user)));
});

/**
 * 获取上传凭证
 */
router.get('/getUploadKey',TokenService.verifyAuthorized,function(req,res,next){
    console.log(req.query.filename);
    res.json(JsonResult(200,"返回上传凭证成功",QiniuService.getUpToken(req.query.filename)));
});

/**
 * 更新用户头像
 */
router.post('/updateUserHeadUrl',TokenService.verifyAuthorized,function(req,res,next){
    UserDao.updateUserHead(req.user.id,req.body.head_url).then(function (update_result) {
        console.log(update_result);
        res.json(JsonResult(200,"头像更新成功",null));
    }).catch(function (err) {
        res.json(JsonResult(500,"头像更新失败，数据库更新失败",err));
    });
});

/**
 * 更新用户信息
 */
router.put('/updateUserInfo',TokenService.verifyAuthorized,function(req,res,next){
    UserDao.updateUserInfo(req.user.id,req.body.username,req.body.is_sync,req.body.is_push).then(function (update_result) {
        res.json(JsonResult(200,"用户信息更新成功",null));
    }).catch(function (err) {
        res.json(JsonResult(500,"用户信息更新失败，数据库更新失败",err));
    });
});

/**
 * 登录退出
 */
router.put('/exit',TokenService.verifyAuthorized,function(req,res,next){
    UserDao.logout(req.user.id).then(function (logout_result) {
        res.json(JsonResult(200,"退出成功",null));
    }).catch(function (err) {
        res.json(JsonResult(500,"退出失败，数据库更新失败",err));
    });
});


/**
 * 同步原木账单
 */
router.put('/syncLogBill',TokenService.verifyAuthorized,function(req,res,next){
    BillDao.validateBillExist(req.body.recordTime).then(function (log_bill) {
        if (log_bill != null){
            return sequelize.transaction(function (t) {
                return BillDao.updateBill(req.body.finance,req.body.recordTime,req.body.type,t).then(function (result) {
                    return BillDao.updateLogData(req.body.data.inputIndex,log_bill.data_id,t).then(function (result) {
                        return BillDao.getLogData(log_bill.data_id,t).then(function (log_data) {
                            return BillDao.updateCount(req.body.data.count,log_data.count_id,t).then(function (result) {
                                return BillDao.updateLogInput(req.body.data.input,log_data.log_id,t).then(function (result) {
                                    req.body.data.logList.forEach(function(log_index) {
                                        return BillDao.createLog(log_index, log_index.logType.id, log_data.id,t);
                                    });
                                    return BillDao.deleteLog(log_data.id,t);
                                });
                            });
                        });
                    });
                });

            }).then(function (result) {
                res.json(JsonResult(200, "同步成功", null));
            }).catch(function (err) {
                res.json(JsonResult(500, "同步失败，数据库更新错误", err));
            });
        }else {
            //开启事务
            return sequelize.transaction(function (t) {
                return BillDao.createLogInput(req.body.data.input, req.body.data.input.logType.id,t).then(function (logInput) {
                    var log_input_id = logInput.id;
                        return BillDao.createCount(req.body.data.count,t).then(function (count) {
                            var count_id = count.id;
                            return BillDao.createLogData(count_id, log_input_id, req.body.data.inputIndex, req.body.data.selectedLogType.id,t).then(function (logData) {
                                var logData_id = logData.id;
                                req.body.data.logList.forEach(function(log_index) {
                                    return BillDao.createLog(log_index, log_index.logType.id, logData_id,t);
                                });
                                return BillDao.createBill(req.body.finance, req.body.recordTime, req.body.type, logData_id, req.user.id, 1,t);
                            });
                        });
                    });
            }).then(function (result) {
                res.json(JsonResult(200, "同步成功", null));
            }).catch(function (err) {
                res.json(JsonResult(500, "同步失败，数据库插入错误", err));
            });

        }
    }).catch(function (err) {
        res.json(JsonResult(500,"同步失败，数据库查询错误",err));
    });


});

/**
 * 同步锯材账单
 */
router.put('/syncTimberBill',TokenService.verifyAuthorized,function(req,res,next){
    BillDao.validateBillExist(req.body.recordTime).then(function (timber_bill) {
        if (timber_bill != null){
            return sequelize.transaction(function (t) {
                return BillDao.updateBill(req.body.finance,req.body.recordTime,req.body.type,t).then(function (result) {
                    return BillDao.updateTimberData(req.body.data.inputIndex,timber_bill.data_id,t).then(function (result) {
                        return BillDao.getTimberData(timber_bill.data_id,t).then(function (timberData) {
                            return BillDao.updateCount(req.body.data.count,timberData.count_id,t).then(function (result) {
                                return BillDao.updateTimberInput(req.body.data.input,timberData.timber_id,t).then(function (result) {
                                    req.body.data.timberList.forEach(function (timber_index){
                                        return BillDao.createTimber(timber_index,timberData.id,t);
                                    });
                                    return BillDao.deleteTimber(timberData.id,t);
                                });
                            });
                        });
                    });
                });
            }).then(function (result) {
                res.json(JsonResult(200, "同步成功", null));
            }).catch(function (err) {
                res.json(JsonResult(500, "同步失败，数据库插入错误", err));
            });
        }else {
            return sequelize.transaction(function (t) {
                return BillDao.createTimberInput(req.body.data.input,t).then(function (timberInput) {
                    return BillDao.createCount(req.body.data.count,t).then(function (count) {
                        return BillDao.createTimberData(count.id,timberInput.id,req.body.data.inputIndex,t).then(function (timberData) {
                            req.body.data.timberList.forEach(function (timber_index){
                                return BillDao.createTimber(timber_index,timberData.id,t);
                            });
                            return BillDao.createBill(req.body.finance, req.body.recordTime, req.body.type, timberData.id, req.user.id, 0,t);
                        });
                    });
                });
            }).then(function (result) {
                res.json(JsonResult(200, "同步成功", null));
            }).catch(function (err) {
                res.json(JsonResult(500, "同步失败，数据库插入错误", err));
            });
        }
    }).catch(function (err) {
        res.json(JsonResult(500,"同步失败，数据库查询错误",err));
    });
});


module.exports = router;
