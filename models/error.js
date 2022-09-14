const Sequelize = require('sequelize');

const sequelize = require('../util/database');


const Error = sequelize.define('error', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },     
    message: {
        type: Sequelize.STRING,
        allowNull: false,
        require : true
        },
    TypeOfError :{
      type: Sequelize.INTEGER,
    }
});



module.exports = Error;