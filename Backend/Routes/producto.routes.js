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
// public
api.get('/product_list_p/:filter?',   productoController.productos_list);
api.get('/product_list_recomend/:catego',   productoController.productos_recomend_list);

api.get('/product/:id',  [validateJWT] , productoController.getProductById);
// public
api.get('/product_p/:slug',    productoController.getProductBySlug);

api.get('/product_img/:id',  productoController.obtener_Portada);
api.put('/actualizar_producto/:id', [validateJWT, path] , productoController.actualizar_producto_admin);
api.put('/actualizar_variedad/:id', [validateJWT] , productoController.actualizar_producto_variedad);
api.put('/actualizar_galeria/:id', [validateJWT,  path] , productoController.actualizar_producto_galeria);
api.put('/eliminar_galeria/:id', [validateJWT] , productoController.eliminar_producto_galeria);


api.delete('/eliminar_producto/:id', [validateJWT] , productoController.BorrarProductoAdmin);

// Inventario
api.get('/inventario/:id',  [validateJWT] , productoController.inventarios_list);
api.delete('/eliminar_inventario/:id', [validateJWT] , productoController.eliminar_inventario_producto);
api.post('/add_inventario', [validateJWT] , productoController.add_inventary_producto);


module.exports = api;