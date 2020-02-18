const Sequlize = require('sequelize');
const db = {};
const sequelize = new Sequlize('nodejs_tasks', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

db.sequelize = sequelize;
db.Sequlize = Sequlize;

module.exports = db;
