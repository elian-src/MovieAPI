const { Router } = require('express');
const { check } = require('express-validator');
const validate = require('../middleware/validate');
const { obtenerGeneros, crearGenero, actualizarGenero, eliminarGenero } = require('../controllers/generos.controller');

const router = Router();

router.get('/', obtenerGeneros);

router.post('/', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validate
], crearGenero);

router.put('/:id', [
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  validate
], actualizarGenero);

router.delete('/:id', eliminarGenero);

module.exports = router;
