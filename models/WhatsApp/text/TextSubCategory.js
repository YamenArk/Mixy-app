const Sequelize = require('sequelize');

const sequelize = require('../../../util/database');


const TextSubCategory = sequelize.define('textsubcategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },     
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        require : true
        },
    image :{
        type : Sequelize.STRING,
        allowNull: false,
        require : false
        },
    isHidden : {
        type : Sequelize.BOOLEAN
    }
});


module.exports = TextSubCategory;