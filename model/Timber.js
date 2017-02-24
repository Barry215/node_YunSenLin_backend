/**
 * Created by frank on 17/2/22.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var Timber = sequelize.define('timber', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    index: Sequelize.INTEGER,
    length: Sequelize.DOUBLE,
    width: Sequelize.DOUBLE,
    height: Sequelize.DOUBLE,
    stack:Sequelize.DOUBLE,
    num:Sequelize.DOUBLE,
    piece:Sequelize.DOUBLE,
    volume:Sequelize.DOUBLE,
    perVolume:Sequelize.DOUBLE,
    total:Sequelize.DOUBLE,
    record_time:Sequelize.DATE,
    timber_data_id:Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'timber',
    timestamps: false
});

module.exports = Timber;