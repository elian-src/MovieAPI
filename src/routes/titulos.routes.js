const { Router } = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const { 
  obtenerTitulos, 
  obtenerTituloPorId, 
  buscarTitulos, 
  crearTitulo, 
  actualizarTitulo, 
  actualizarPuntuacion, 
  eliminarTitulo 
} = require('../controllers/titulos.controller');

const router = Router();

const validacionesComunes = [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('tipo', 'El tipo debe ser pelicula o serie').isIn(['pelicula', 'serie']),
  check('anio', 'El año debe ser un número').isNumeric(),
  check('generoId', 'El ID del género es obligatorio').not().isEmpty(),
  check('puntuacion', 'La puntuación debe estar entre 1 y 10').optional().isFloat({ min: 1, max: 10 }),
  validate
];

router.get('/', obtenerTitulos);
router.get('/buscar', buscarTitulos);
router.get('/:id', obtenerTituloPorId);

router.post('/', validacionesComunes, crearTitulo);

router.put('/:id', validacionesComunes, actualizarTitulo);

router.patch('/:id/puntuacion', [
  check('puntuacion', 'La puntuación debe estar entre 1 y 10').isFloat({ min: 1, max: 10 }),
  validate
], actualizarPuntuacion);

router.delete('/:id', eliminarTitulo);

module.exports = router;
