'use strict'
var carrito = require('../Models/carrito');
const { generateJWT } = require('../Helpers/jwt');

const addCartClient = async (req, res) => {

    if (!req.uid) {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    var data  = req.body;
    const { cliente, producto } = data;
    let carrExist = await carrito.find({cliente, producto});

    if (carrExist.length >= 1) {
        return res.status(500).send({
            ok: false,
            message: 'Ya existe este porducto en tu carrito.'
        }); 
    }

    try {

        let carritoCreated = await carrito.create(data);
        
        return res.status(200).send({
            ok: true, 
            message: `Agregado al carrito!`, 
            data: carritoCreated
        });
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: '' + error.message
        }); 
    }

}

const getCartClient = async (req, res) => {

    if (!req.uid) {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const id = req.params.id;
    
    try {

        const cart = await carrito.find({cliente: id}).populate('producto');

        res.status(200).send({
            ok: true,
            cart
        })
        
    } catch (error) {
        return res.status(500).send({
            ok: false,
            message: '' + error.message
        }); 
    }

}


const deleteCarrito = async (req, res) => {

    if (!req.uid) {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }
    const id = req.params.id;

    // const data = {...req.body};


    let reg = await carrito.findByIdAndRemove({_id: id});

    
    
    return res.status(200).send({ok: true, message: 'Se elimino del carrito', data: reg});

}


module.exports = {
    addCartClient,
    getCartClient,
    deleteCarrito
}