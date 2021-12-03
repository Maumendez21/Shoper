'use strict'
var Config = require('../Models/config');

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
        
    }
    console.log(data);
    // "61aa8d13a84b755837df94f2" Laboral
    // "61aa3f82ea825f9d1e049b7b" Personal

    let configPut  = await Config.findByIdAndUpdate({_id: "61aa8d13a84b755837df94f2"}, data);


    if (req.files != undefined) {
        fs.stat('./uploads/configuraciones/' + configPut.logo, (err, stats) => {
            
            if (!err) {
                fs.unlink('./uploads/configuraciones/' + configPut.logo, (err, stats) => {
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
        
        const _config = await Config.findById("61aa8d13a84b755837df94f2");

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
    getConfigById
}