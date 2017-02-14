/**
 * Created by frank on 17/2/14.
 */
function JsonResult(status,message,data) {
    return {
        status: status,
        message: message,
        data: data
    };
}

module.exports = JsonResult;
