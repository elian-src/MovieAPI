const { Titulo, Genero } = require('../models');
const { Op } = require('sequelize');

const obtenerTitulos = async (req, res, next) => {
  try {
    const { nombre, tipo, genero, anio, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (nombre) {
      where.nombre = { [Op.iLike]: `%${nombre}%` };
    }
    if (tipo) {
      where.tipo = tipo;
    }
    if (anio) {
      where.anio = anio;
    }

    const include = [{
      model: Genero,
      as: 'genero',
      attributes: ['id', 'nombre']
    }];

    if (genero) {
      include[0].where = { nombre: { [Op.iLike]: `%${genero}%` } };
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Titulo.findAndCountAll({
      where,
      include,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['id', 'DESC']]
    });

    res.status(200).json({
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
      data: rows
    });
  } catch (error) {
    next(error);
  }
};

const obtenerTituloPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const titulo = await Titulo.findByPk(id, {
      include: [{ model: Genero, as: 'genero' }]
    });
    if (!titulo) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }
    res.status(200).json(titulo);
  } catch (error) {
    next(error);
  }
};

const buscarTitulos = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Debe proporcionar un término de búsqueda' });
    }
    const titulos = await Titulo.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${q}%` } },
          { tipo: { [Op.iLike]: `%${q}%` } }
        ]
      },
      include: [{ model: Genero, as: 'genero' }]
    });
    res.status(200).json(titulos);
  } catch (error) {
    next(error);
  }
};

const crearTitulo = async (req, res, next) => {
  try {
    const { nombre, tipo, descripcion, anio, director, duracion, puntuacion, generoId } = req.body;
    const genero = await Genero.findByPk(generoId);
    if (!genero) {
      return res.status(400).json({ message: 'El género no existe' });
    }
    const nuevoTitulo = await Titulo.create({
      nombre, tipo, descripcion, anio, director, duracion, puntuacion, generoId
    });
    res.status(201).json(nuevoTitulo);
  } catch (error) {
    next(error);
  }
};

const actualizarTitulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, descripcion, anio, director, duracion, puntuacion, generoId } = req.body;
    
    const titulo = await Titulo.findByPk(id);
    if (!titulo) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }

    if (generoId) {
      const genero = await Genero.findByPk(generoId);
      if (!genero) {
        return res.status(400).json({ message: 'El género no existe' });
      }
    }

    await titulo.update({
      nombre, tipo, descripcion, anio, director, duracion, puntuacion, generoId
    });

    res.status(200).json(titulo);
  } catch (error) {
    next(error);
  }
};

const actualizarPuntuacion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { puntuacion } = req.body;
    
    const titulo = await Titulo.findByPk(id);
    if (!titulo) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }

    titulo.puntuacion = puntuacion;
    await titulo.save();

    res.status(200).json(titulo);
  } catch (error) {
    next(error);
  }
};

const eliminarTitulo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const titulo = await Titulo.findByPk(id);
    if (!titulo) {
      return res.status(404).json({ message: 'Título no encontrado' });
    }
    await titulo.destroy();
    res.status(200).json({ message: 'Título eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerTitulos,
  obtenerTituloPorId,
  buscarTitulos,
  crearTitulo,
  actualizarTitulo,
  actualizarPuntuacion,
  eliminarTitulo
};
