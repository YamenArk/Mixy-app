const Sequelize = require('sequelize');

const sequelize = require('../../util/database');


const Quete = sequelize.define('quete', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },     
    Quotes: {
        type: Sequelize.STRING,
        allowNull: false,
        require : true
        },
    isHidden :{
      type : Sequelize.BOOLEAN,
      allowNull: false,
      require : true
      },
    sharing : {
      type: Sequelize.INTEGER,
      require : true,
      allowNull: false,
    }
});



module.exports = Quete;