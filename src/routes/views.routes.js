const { Router } = require('express');
const axios = require('axios');

const router = Router();
const API_URL = `http://localhost:${process.env.PORT || 3000}/api`;

router.get('/', async (req, res, next) => {
  try {
    const { tipo, genero, page = 1 } = req.query;
    let url = `${API_URL}/titulos?page=${page}`;
    if (tipo) url += `&tipo=${tipo}`;
    if (genero) url += `&genero=${genero}`;
    
    const response = await axios.get(url);
    const generosResponse = await axios.get(`${API_URL}/generos`);
    
    res.render('index', { 
      titulos: response.data.data, 
      totalPages: response.data.totalPages,
      currentPage: response.data.page,
      filtros: { tipo, genero },
      generos: generosResponse.data
    });
  } catch (error) {
    next(error);
  }
});

router.get('/detalle/:id', async (req, res, next) => {
  try {
    const response = await axios.get(`${API_URL}/titulos/${req.params.id}`);
    res.render('detalle', { titulo: response.data });
  } catch (error) {
    next(error);
  }
});

router.get('/nuevo', async (req, res, next) => {
  try {
    const response = await axios.get(`${API_URL}/generos`);
    res.render('nuevo', { generos: response.data });
  } catch (error) {
    next(error);
  }
});

router.get('/editar/:id', async (req, res, next) => {
  try {
    const [tituloRes, generosRes] = await Promise.all([
      axios.get(`${API_URL}/titulos/${req.params.id}`),
      axios.get(`${API_URL}/generos`)
    ]);
    res.render('editar', { titulo: tituloRes.data, generos: generosRes.data });
  } catch (error) {
    next(error);
  }
});

router.get('/generos', async (req, res, next) => {
  try {
    const response = await axios.get(`${API_URL}/generos`);
    res.render('generos/index', { generos: response.data });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
