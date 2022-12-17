const { Sequelize } = require('sequelize');

let db;
if(process.env.JAWSDB_URL) {
   db = new Sequelize(process.env.JAWSDB_URL);
} else {
   db = new Sequelize('tesla1', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
  });
}

module.exports = db;