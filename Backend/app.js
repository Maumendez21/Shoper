'use strict'
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
var port = process.env.PORT || 4201;
var app = express();

var cliente_route = require('./Routes/cliente.routes');
var admin_route = require('./Routes/admin.routes');

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/shop' ,(err, db) => {
    if (err) {
        console.log(err);
    }else {
        app.listen(port, function () {
            console.log('Servidor corriendo en ' + port);
        })
    }
});

app.use(bodyparser.urlencoded({
    extended: true
}));

app.use(bodyparser.json({
    extended: true,
    limit: '50mb'
}))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api', cliente_route);
app.use('/api', admin_route);

module.exports = app;