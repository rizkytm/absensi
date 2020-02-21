const Sequelize = require('sequelize');
const db = require('../database/db.js');

module.exports = db.sequelize.define(
  'peserta_workshop',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nama: {
      type: Sequelize.STRING
    },
    no_konfirmasi: {
        type: Sequelize.STRING
    },
    jenis_tiket: {
        type: Sequelize.STRING
    },
    program: {
        type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    presence_time: {
      type: Sequelize.DATE
    }
  },
  {
    timestamps: false
  }
);
