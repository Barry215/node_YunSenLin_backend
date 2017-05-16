/**
 * Created by frank on 17/2/16.
 */
var User = require('../model/User');


function getLoginResult(phone, password) {
        return User.findOne({
            where: {
                phone: phone,
                password: password
            }
        });

}

function createUser(phone, password, token) {
    return User.create({
            phone: phone,
            password: password,
            token: token
        });
}

function updateUserToken(id, token) {
    return User.update({
        token : token
    },{
        where:{
            id : id
        }
    });
}

function validateUserExist(phone) {
    return User.findOne({
        where: {
            phone: phone
        }
    });
}

function modifyUserPsd(phone, new_psd) {
    return User.update({
        password : new_psd
    },{
        where:{
            phone : phone
        }
    });
}

function resetUserPsd(phone, new_psd, token) {
    return User.update({
        password : new_psd,
        token : token
    },{
        where:{
            phone : phone
        }
    });
}

function logout(id) {
    return User.update({
        token : ""
    },{
        where:{
            id : id
        }
    });
}

function updateUserHead(id,head_url) {
    return User.update({
        user_head : head_url
    },{
        where:{
            id : id
        }
    });
}

function updateUserInfo(id,username,is_sync,is_push) {
    var param_1 = is_sync?1:0;
    var param_2 = is_push?1:0;

    return User.update({
        username : username,
        is_sync : param_1,
        is_push : param_2
    },{
        where:{
            id : id
        }
    });
}

module.exports = {
    getLoginResult : getLoginResult,
    createUser : createUser,
    validateUserExist : validateUserExist,
    modifyUserPsd : modifyUserPsd,
    resetUserPsd : resetUserPsd,
    logout : logout,
    updateUserHead : updateUserHead,
    updateUserInfo : updateUserInfo,
    updateUserToken : updateUserToken
};