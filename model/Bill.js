/**
 * Created by frank on 17/2/22.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var Bill = sequelize.define('bill', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    finance: Sequelize.STRING,
    record_time:Sequelize.DATE,
    type: Sequelize.STRING,
    data_id: Sequelize.INTEGER,
    user_id: Sequelize.INTEGER,
    which: Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'bill',
    timestamps: false
});

module.exports = Bill;