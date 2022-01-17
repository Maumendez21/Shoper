'use strict'
var express = require('express');
var carritoController = require('../Controllers/carrito.controller');
const { validateJWT } = require('../Middlewares/validate_jwt');

var api = express.Router();

api.post('/add_cart', [validateJWT],carritoController.addCartClient);
api.get('/cart/:id',  [validateJWT] , carritoController.getCartClient);
api.delete('/cart_delete/:id',  [validateJWT] , carritoController.deleteCarrito);
// api.post('/registro_cliente_admin',  [validateJWT] , clienteController.regsitro_cliente_admin);
// api.post('/login_cliente', clienteController.login_cliente);
// api.get('/client_list/:tipo?/:filter?',  [validateJWT] , clienteController.cliente_list);
// api.put('/update_client/:id',  [validateJWT] , clienteController.ActualizarClienteAdmin);
// api.put('/update_client_guest/:id',  [validateJWT] , clienteController.ActualizarClienteGuest);
// api.delete('/delete_client/:id',  [validateJWT] , clienteController.BorrarClienteAdmin);
// ,  [validateJWT]
module.exports = api;