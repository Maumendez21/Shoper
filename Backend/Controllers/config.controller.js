'use strict'
var Config = require('../Models/config');

const updateConfigAdmin = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    let data = {...req.body}

    if (req.files != undefined) {
        var img_path = req.files.logo.path;
        var name = img_path.split('\\');
        data.logo = name[2];
        
    }

    let configPut  = await Config.findByIdAndUpdate({_id: "61aa3f82ea825f9d1e049b7b"}, {data});


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
        
        const _config = await Config.findById("61aa3f82ea825f9d1e049b7b");

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