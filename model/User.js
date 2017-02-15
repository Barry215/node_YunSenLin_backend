/**
 * Created by frank on 17/2/14.
 */
var Sequelize = require('sequelize');
var sequelize = require('../db/Sequelize');


var User = sequelize.define('user', {
    id:{
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    phone:Sequelize.STRING,
    user_head:Sequelize.STRING,
    state:Sequelize.INTEGER,
    created_at:Sequelize.DATE,
    updated_at:Sequelize.DATE
}, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false
});

module.exports = User;
