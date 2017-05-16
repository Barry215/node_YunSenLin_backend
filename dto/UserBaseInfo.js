/**
 * Created by frank on 17/2/16.
 */
function userBaseInfo(user) {
    var username;
    var user_head;

    if (user.username != null){
        username = user.username;
    }else {
        username = "未设置";
    }

    if (user.user_head != null){
        user_head = user.user_head;
    }else {
        user_head = "http://oljvmfhby.bkt.clouddn.com/default.jpg";
    }

    return {
        username:username,
        user_head:user_head,
        phone:user.phone,
        is_sync:user.is_sync == 1,
        is_push:user.is_push == 1
    }
}

module.exports = userBaseInfo;