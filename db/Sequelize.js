/**
 * Created by frank on 17/2/14.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    'yunsenlin',    //数据库名
    'frank',         //用户名
    'Frank315!',    //密码
    {
        'dialect': 'mysql',
        'host': '115.159.190.30',
        'port': 3306
    }
);

module.exports = sequelize;