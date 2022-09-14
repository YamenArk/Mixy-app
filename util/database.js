const Sequelize = require('sequelize');

const sequelize = new Sequelize('MixyApp', 'root', '', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
