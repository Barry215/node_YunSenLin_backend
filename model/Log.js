/**
 * Created by frank on 17/2/22.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var Log = sequelize.define('log', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    index: Sequelize.INTEGER,
    length: Sequelize.DOUBLE,
    diameter:Sequelize.DOUBLE,
    num:Sequelize.DOUBLE,
    piece:Sequelize.DOUBLE,
    volume:Sequelize.DOUBLE,
    perVolume:Sequelize.DOUBLE,
    total:Sequelize.DOUBLE,
    record_time:Sequelize.DATE,
    logType_id:Sequelize.INTEGER,
    log_data_id:Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'log',
    timestamps: false
});

module.exports = Log;