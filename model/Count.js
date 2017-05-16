/**
 * Created by frank on 17/2/22.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var Count = sequelize.define('count', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    total: Sequelize.DOUBLE,
    num: Sequelize.INTEGER,
    volume: Sequelize.DOUBLE
}, {
    freezeTableName: true,
    tableName: 'count',
    timestamps: false
});

module.exports = Count;