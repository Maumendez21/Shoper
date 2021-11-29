'use strict'
var express = require('express');
var clienteController = require('../Controllers/cliente.controller');
const { validateJWT } = require('../Middlewares/validate_jwt');

var api = express.Router();

api.post('/registro_cliente', clienteController.registro_cliente);
api.post('/registro_cliente_admin',  [validateJWT] , clienteController.regsitro_cliente_admin);
api.post('/login_cliente', clienteController.login_cliente);
api.get('/client_list/:tipo?/:filter?',  [validateJWT] , clienteController.cliente_list);
api.get('/client/:id',  [validateJWT] , clienteController.getClienteById);
api.put('/update_client/:id',  [validateJWT] , clienteController.ActualizarClienteAdmin);
api.delete('/delete_client/:id',  [validateJWT] , clienteController.BorrarClienteAdmin);
// ,  [validateJWT]
module.exports = api;