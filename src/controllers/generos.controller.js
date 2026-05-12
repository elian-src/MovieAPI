const { Genero, Titulo } = require('../models');

const obtenerGeneros = async (req, res, next) => {
  try {
    const generos = await Genero.findAll();
    res.status(200).json(generos);
  } catch (error) {
    next(error);
  }
};

const crearGenero = async (req, res, next) => {
  try {
    const { nombre } = req.body;
    const existe = await Genero.findOne({ where: { nombre } });
    if (existe) {
      return res.status(409).json({ message: 'El género ya existe' });
    }
    const nuevoGenero = await Genero.create({ nombre });
    res.status(201).json(nuevoGenero);
  } catch (error) {
    next(error);
  }
};

const actualizarGenero = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const genero = await Genero.findByPk(id);
    if (!genero) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }
    const existe = await Genero.findOne({ where: { nombre } });
    if (existe && existe.id !== parseInt(id)) {
      return res.status(409).json({ message: 'Ya existe otro género con ese nombre' });
    }
    genero.nombre = nombre;
    await genero.save();
    res.status(200).json(genero);
  } catch (error) {
    next(error);
  }
};

const eliminarGenero = async (req, res, next) => {
  try {
    const { id } = req.params;
    const genero = await Genero.findByPk(id, {
      include: [{ model: Titulo, as: 'titulos' }]
    });
    if (!genero) {
      return res.status(404).json({ message: 'Género no encontrado' });
    }
    if (genero.titulos && genero.titulos.length > 0) {
      return res.status(400).json({ message: 'No se puede borrar un género que tiene títulos asociados' });
    }
    await genero.destroy();
    res.status(200).json({ message: 'Género eliminado' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  obtenerGeneros,
  crearGenero,
  actualizarGenero,
  eliminarGenero
};
