/**
 * Created by frank on 17/2/16.
 */

function validatePhone(phone) {
    var reg = /^[1][35678][0-9]{9}$/;
    return reg.test(phone);
}

function getPhoneCode() {
    var m = 9999;
    var n = 1000;
    var w = m - n;
    return parseInt(Math.random()*w+n, 10);
}

function validateCode(code) {
    return code == null || code == "";
}

module.exports = {
    validatePhone : validatePhone,
    getPhoneCode : getPhoneCode,
    validateCode : validateCode
};