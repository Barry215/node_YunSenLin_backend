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
    is_sync:Sequelize.INTEGER,
    is_push:Sequelize.INTEGER,
    created_at:Sequelize.DATE,
    updated_at:Sequelize.DATE,
    token:Sequelize.STRING
}, {
    freezeTableName: true,
    tableName: 'user',
    timestamps: false
});

module.exports = User;
