/**
 * Created by frank on 17/2/18.
 */
var qiniu = require("qiniu");
qiniu.conf.ACCESS_KEY = 'AQyqTUgn06_Z-b-WF_5QwQqJTIRIg0dlzxWhNn35';
qiniu.conf.SECRET_KEY = 'Hy_yD1ETkM_wHqNi1Vdmmp4AH28MfzbR_Qh4Hn-3';


//构建上传策略函数
function getUpToken(filename) {
    var putPolicy = new qiniu.rs.PutPolicy("yunsenlin:"+filename);
    return putPolicy.token();
}

module.exports = {
    getUpToken : getUpToken
};
