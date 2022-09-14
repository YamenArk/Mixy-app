const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Admin = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },     
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        require : true
        },
    password :{
        type : Sequelize.STRING,
        allowNull: false,
        require : true
        }
});



module.exports = Admin;