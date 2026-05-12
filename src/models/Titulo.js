const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Titulo = sequelize.define('Titulo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.ENUM('pelicula', 'serie'),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  director: {
    type: DataTypes.STRING,
    allowNull: true
  },
  duracion: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  puntuacion: {
    type: DataTypes.DECIMAL(3, 1),
    allowNull: true,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  timestamps: false,
  tableName: 'titulos'
});

module.exports = Titulo;
