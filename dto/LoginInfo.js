/**
 * Created by frank on 17/2/16.
 */
function loginInfo(user,token) {
    var username;

    if (user.username != null){
        username = user.username;
    }else {
        username = "未设置";
    }

    return {
        username:username,
        is_sync:user.is_sync == 1,
        is_push:user.is_push == 1,
        token:token
    }
}

module.exports = loginInfo;