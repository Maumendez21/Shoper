'use strict'
var producto = require('../Models/producto');
var fs = require('fs');
var path = require('path');

const registro_producto_admin = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    // console.log(req.body);
    // console.log(req.files);
    let data = req.body;

    var img_path = req.files.portada.path;
    var name = img_path.split('\\');
    data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    data.portada = name[2];

    let reg = await producto.create(data);

    res.status(200).send({ok: true, data: reg});

}

const productos_list = async (req, res) => {
    let filtro = req.params.filter;

    if (filtro != 'all') {
        let reg = await producto.find({titulo: new RegExp(filtro, 'i') });
        res.status(200).send({data:reg});
        return;

    }


    let reg = await producto.find();
    res.status(200).send({ok: true, data:reg})
}


const getProductById = async (req, res) => {
    const id = req.params.id;
    try {
        
        const product = await producto.findById(id);

        res.status(200).send({
            ok: true,
            product
        })
        
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: error.message + ''
        });
    }

}

const obtener_Portada = async (req, res) => {
    var img = req.params.id;
    console.log(img);
    fs.stat('./uploads/products/' + img, (err, stats) => {

        if (err) {
            let _path1 = './uploads/default.jpg';
            res.status(404).sendFile(path.resolve(_path1));
            return;
        }
        
        let _path = './uploads/products/' + img;
        res.status(200).sendFile(path.resolve(_path));
    })
}

module.exports = {
    registro_producto_admin,
    productos_list,
    getProductById,
    obtener_Portada
}