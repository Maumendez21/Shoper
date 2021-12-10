'use strict'
var Config = require('../Models/config');

var fs = require('fs');
var path = require('path');

const updateConfigAdmin = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }



    // await Config.create({
    //     categorias: [],
    //     titulo: 'Shoper',
    //     logo: 'logo.png',
    //     serie: '001',
    //     correolativo: '000001'
    // })

    let data = {...req.body}


    if (req.files != undefined) {
        console.log('hay imagen');
        var img_path = req.files.logo.path;
        var name = img_path.split('\\');
        data.logo = name[2];
        data.categorias = JSON.parse(data.categorias)
        
    }

    // let data1 = {

    // }


    
    // "61aa8d13a84b755837df94f2" Laboral
    // "61b10015db6d4f2e0ca52330" Personal

    let configPut  = await Config.findByIdAndUpdate({_id: "61b10015db6d4f2e0ca52330"}, data);
    console.log(configPut);


    if (req.files != undefined) {
        fs.stat('./Uploads/configuraciones/' + configPut.logo, (err, stats) => {
            
            if (!err) {
                fs.unlink('./Uploads/configuraciones/' + configPut.logo, (err, stats) => {
                    if (err) throw err;
                });
            }
        })
    }


    res.status(200).send({
        ok: true, 
        message: `Configuración actualizada`, 
        data: configPut
    });

}

const getConfigById = async (req, res) => {

    const id = req.params.id;

    try {
        
        const _config = await Config.findById("61b10015db6d4f2e0ca52330");

        res.status(200).send({
            ok: true,
            _config
        })
        
    } catch (error) {

        res.status(500).send({
            ok: false,
            message: error.message + ''
        });
    }

}

const obtener_logo = async (req, res) => {
    var img = req.params.id;
    fs.stat('./uploads/configuraciones/' + img, (err, stats) => {

        if (err) {
            let _path1 = './uploads/default.jpg';
            res.status(404).sendFile(path.resolve(_path1));
            return;
        }
        
        let _path = './uploads/configuraciones/' + img;
        res.status(200).sendFile(path.resolve(_path));
    })
}

const getCategos = async (req, res) => {


    try {
        
        const _config = await Config.findById("61b10015db6d4f2e0ca52330");

        res.status(200).send({
            ok: true,
            _config
        })
        
    } catch (error) {

        res.status(500).send({
            ok: false,
            message: error.message + ''
        });
    }

}






module.exports = {
    updateConfigAdmin,
    getConfigById,
    obtener_logo,
    getCategos
}