const Sequelize = require('sequelize');

const sequelize = require('../../../util/database');


const Video = sequelize.define('video', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },     
    video: {
        type: Sequelize.STRING,
        allowNull: false,
        require : true
        },
    sharing : {
      type: Sequelize.INTEGER,
      require : true,
      allowNull: false,
    },
    isHidden :{
      type : Sequelize.BOOLEAN,
      allowNull: false,
      require : true
      },
});



module.exports = Video;