'use strict'
var express = require('express');
var cuponController = require('../Controllers/cupon.controller');
const { validateJWT } = require('../Middlewares/validate_jwt');

var api = express.Router();

api.post('/registro_cupon',  [validateJWT] , cuponController.resitro_cupon);
api.put('/update_cupon/:id',  [validateJWT] , cuponController.actualizar_cupon_admin);
api.get('/cupon/:id',  [validateJWT] , cuponController.getCuponById);
api.get('/cupon_list/:filter?',  [validateJWT] , cuponController.cupons_list);
api.delete('/cupon_delete/:id',  [validateJWT] , cuponController.BorrarCuponAdmin);
module.exports = api;