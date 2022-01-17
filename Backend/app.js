'use strict'
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
var port = process.env.PORT || 4201;


var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    cors: {origin: '*'}
});

io.on('connection', (socket)=>{
    socket.on('delete-carrito', (data)=>{
        io.emit('new-carrito', data);
    });

    socket.on('add-carrito', (data)=>{
        io.emit('new-carrito-add', data);
        console.log(data);
    });
})

var cliente_route = require('./Routes/cliente.routes');
var admin_route = require('./Routes/admin.routes');
var producto_route = require('./Routes/producto.routes');
var cupon_route = require('./Routes/cupon.routes');
var config_route = require('./Routes/config.routes');
var carrito_route = require('./Routes/carrito.routes');

app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/shop' ,(err, db) => {
    if (err) {
        console.log(err);
    }else {
        server.listen(port, function () {
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
app.use('/api', producto_route);
app.use('/api', cupon_route);
app.use('/api', config_route);
app.use('/api', carrito_route);

module.exports = app;