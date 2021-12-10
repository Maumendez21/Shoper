'use strict'
var express = require('express');
var configController = require('../Controllers/config.controller');
const { validateJWT } = require('../Middlewares/validate_jwt');
var multiparty = require('connect-multiparty');

var path = multiparty({uploadDir: './Uploads/configuraciones'});

var api = express.Router();

api.put('/update_config',  [validateJWT, path] , configController.updateConfigAdmin);
// api.post('/update_config',   configController.updateConfigAdmin);
api.get('/get_config',  [validateJWT] , configController.getConfigById);
api.get('/get_cat',   configController.getCategos);
api.get('/logo_img/:id',  configController.obtener_logo)
// api.post('/registro_cupon',  [validateJWT] , cuponController.resitro_cupon);
// api.put('/update_cupon/:id',  [validateJWT] , cuponController.actualizar_cupon_admin);
// api.get('/cupon/:id',  [validateJWT] , cuponController.getCuponById);
// api.get('/cupon_list/:filter?',  [validateJWT] , cuponController.cupons_list);
// api.delete('/cupon_delete/:id',  [validateJWT] , cuponController.BorrarCuponAdmin);
module.exports = api;