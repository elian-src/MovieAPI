const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Genero = sequelize.define('Genero', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  }
}, {
  timestamps: false,
  tableName: 'generos'
});

module.exports = Genero;
