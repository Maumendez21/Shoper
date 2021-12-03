'use strict'
var cupon = require('../Models/cupon');

const cupons_list = async (req, res) => {

    let filtro = req.params.filter;
    

    if (filtro != 'all') {
        let list = await cupon.find({codigo: new RegExp(filtro, 'i') }).sort({createdAt: -1});
        res.status(200).send({ok:true, data:list});
        return;

    }


    let list = await cupon.find().sort({createdAt: -1});
    res.status(200).send({ok: true, data:list})
}

const resitro_cupon = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    let data = req.body;

    
    try {

        let cuponCreated = await cupon.create(data);
        
        res.status(200).send({
            ok: true, 
            message: `Cupón ${cuponCreated.codigo} registrado correctamente`, 
            data: cuponCreated
        });
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: '' + error.message
        }); 
    }
    

}

const actualizar_cupon_admin = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const data = {...req.body};
    const id = req.params.id;

    try {
        let reg = await cupon.findByIdAndUpdate({_id: id},  data);
        
        return res.status(200).send({ok: true, message: 'Cupón Actualizado', data: reg});

    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: '' + error.message
        }); 
    }
}

const getCuponById = async (req, res) => {

    const id = req.params.id;

    try {
        
        const _cupon = await cupon.findById(id);

        res.status(200).send({
            ok: true,
            cupon: _cupon
        })
        
    } catch (error) {

        res.status(500).send({
            ok: false,
            message: error.message + ''
        });
    }

}

const BorrarCuponAdmin = async (req, res) => {


    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const id = req.params.id;


    try {
        const deleted = await cupon.findByIdAndDelete({_id: id});


        return res.status(200).send({ok: true, message: 'Cupón ' +  deleted.codigo + ' Eliminado'});
    } catch (error) {
        return res.status(500).send({ok: false, message:'Hubo un error, comunicate con el administrador.'});
    }

    
}



module.exports = {
    resitro_cupon,
    getCuponById,
    cupons_list,
    actualizar_cupon_admin,
    BorrarCuponAdmin
}