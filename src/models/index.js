const Genero = require('./Genero');
const Titulo = require('./Titulo');
const sequelize = require('../config/database');

// Un Genero tiene muchos Titulos
Genero.hasMany(Titulo, {
  foreignKey: {
    name: 'generoId',
    allowNull: false
  },
  as: 'titulos',
  onDelete: 'RESTRICT' // No borrar si tiene títulos
});

// Un Titulo pertenece a un Genero
Titulo.belongsTo(Genero, {
  foreignKey: {
    name: 'generoId',
    allowNull: false
  },
  as: 'genero'
});

module.exports = {
  Genero,
  Titulo,
  sequelize
};
