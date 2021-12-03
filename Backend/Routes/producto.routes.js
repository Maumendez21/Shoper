'use strict'
var express = require('express');
var productoController = require('../Controllers/producto.controller');
const { validateJWT } = require('../Middlewares/validate_jwt');
var multiparty = require('connect-multiparty');

var path = multiparty({uploadDir: './Uploads/products'});

var api = express.Router();

// Producto
api.post('/registro_producto', [validateJWT, path] , productoController.registro_producto_admin);
api.get('/product_list/:filter?',  [validateJWT] , productoController.productos_list);
api.get('/product/:id',  [validateJWT] , productoController.getProductById);
api.get('/product_img/:id',  productoController.obtener_Portada);
api.put('/actualizar_producto/:id', [validateJWT, path] , productoController.actualizar_producto_admin);
api.delete('/eliminar_producto/:id', [validateJWT] , productoController.BorrarProductoAdmin);

// Inventario
api.get('/inventario/:id',  [validateJWT] , productoController.inventarios_list);
api.delete('/eliminar_inventario/:id', [validateJWT] , productoController.eliminar_inventario_producto);
api.post('/add_inventario', [validateJWT] , productoController.add_inventary_producto);


module.exports = api;