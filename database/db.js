const Sequlize = require('sequelize');
const db = {};
const sequelize = new Sequlize('nodejs_tasks', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorAliases: false,

  timezone: '+07:00',

  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },

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
