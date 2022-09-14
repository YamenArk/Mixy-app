const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },     
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        require : true
        },
    password :{
        type : Sequelize.STRING,
        allowNull: false,
        require : true
        },
    insert :{
        type : Sequelize.BOOLEAN
        },
    delete :{
        type : Sequelize.BOOLEAN
        },
    view :{
        type : Sequelize.BOOLEAN
        },
    isHidden :{
        type : Sequelize.BOOLEAN
        },
    levelOfTheUser :{
        type: Sequelize.INTEGER
    }
});



module.exports = User;