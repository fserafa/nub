const express = require('express');

const FaturaController = require('./controllers/FaturaController');
const FiadorController = require('./controllers/FiadorController');

const routes = new express.Router();

routes.get('/faturas', FaturaController.index)
routes.get('/fatura/:id', FaturaController.getById)

routes.post('/extrair', FaturaController.extrair)
routes.put('/fatura/:id', FaturaController.update)

routes.delete('/fatura/:id', FaturaController.delete)

routes.post('/fiador', FiadorController.store)

routes.get('/fiadores', FiadorController.index)

routes.delete('/fatura/:id', FiadorController.delete)


module.exports = routes;