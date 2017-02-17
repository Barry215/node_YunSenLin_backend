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

module.exports = {
    getLoginResult : getLoginResult,
    createUser : createUser,
    validateUserExist : validateUserExist,
    modifyUserPsd : modifyUserPsd,
    resetUserPsd : resetUserPsd,
    updateUserToken : updateUserToken
};