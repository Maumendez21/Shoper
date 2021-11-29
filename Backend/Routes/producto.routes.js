'use strict'
var express = require('express');
var productoController = require('../Controllers/producto.controller');
const { validateJWT } = require('../Middlewares/validate_jwt');
var multiparty = require('connect-multiparty');

var path = multiparty({uploadDir: './Uploads/products'});

var api = express.Router();

api.post('/registro_producto', [validateJWT, path] , productoController.registro_producto_admin);
api.get('/product_list/:filter?',  [validateJWT] , productoController.productos_list);
api.get('/product/:id',  [validateJWT] , productoController.getProductById);
api.get('/product_img/:id',  productoController.obtener_Portada);
// api.post('/registro_cliente_admin',  [validateJWT] , clienteController.regsitro_cliente_admin);
// api.post('/login_cliente', clienteController.login_cliente);
// api.get('/client_list/:tipo?/:filter?',  [validateJWT] , clienteController.cliente_list);
// api.get('/client/:id',  [validateJWT] , clienteController.getClienteById);
// api.put('/update_client/:id',  [validateJWT] , clienteController.ActualizarClienteAdmin);
// api.delete('/delete_client/:id',  [validateJWT] , clienteController.BorrarClienteAdmin);
// ,  [validateJWT]
module.exports = api;