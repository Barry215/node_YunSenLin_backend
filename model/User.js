/**
 * Created by frank on 17/2/14.
 */

var User = sequelize.define('user', {
    id:Sequelize.INTEGER,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    phone:Sequelize.STRING,
    userhead:Sequelize.STRING,
    state:Sequelize.INTEGER,
    token:Sequelize.STRING,
    created_at:Sequelize.DATE,
    updated_at:Sequelize.DATE
});

module.exports = User;
