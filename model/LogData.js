/**
 * Created by frank on 17/2/22.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var LogData = sequelize.define('log_data', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    count_id: Sequelize.INTEGER,
    log_id: Sequelize.INTEGER,
    input_index: Sequelize.INTEGER,
    logType_id: Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'log_data',
    timestamps: false
});

module.exports = LogData;