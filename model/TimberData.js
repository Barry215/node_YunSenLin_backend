/**
 * Created by frank on 17/2/22.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var TimberData = sequelize.define('timber_data', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    count_id: Sequelize.INTEGER,
    timber_id: Sequelize.INTEGER,
    input_index: Sequelize.INTEGER
}, {
    freezeTableName: true,
    tableName: 'timber_data',
    timestamps: false
});

module.exports = TimberData;