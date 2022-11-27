const { Sequelize } = require('sequelize');

  const db = new Sequelize('tesla1', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = db;