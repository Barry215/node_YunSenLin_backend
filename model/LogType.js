/**
 * Created by frank on 17/2/22.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var LogType = sequelize.define('logType', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true
    },
    name: Sequelize.STRING,
    remark: Sequelize.STRING
}, {
    freezeTableName: true,
    tableName: 'logType',
    timestamps: false
});

module.exports = LogType;