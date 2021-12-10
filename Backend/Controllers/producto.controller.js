'use strict'
var producto = require('../Models/producto');
var Inventario = require('../Models/inventario');
var fs = require('fs');
var path = require('path');

const registro_producto_admin = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    let data = req.body;

    var img_path = req.files.portada.path;
    var name = img_path.split('\\');
    data.slug = data.titulo.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    data.portada = name[2];

    let reg = await producto.create(data);

    let inventario = await Inventario.create({
        admin: req.uid,
        cantidad: data.stock,
        proveedor: 'Primer registro', 
        producto: reg._id
    })

    res.status(200).send({ok: true, data: reg, inventario});

}
const actualizar_producto_admin = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const data = {...req.body};
    const id = req.params.id;

    if (req.files != undefined) {
        var img_path = req.files.portada.path;
        var name = img_path.split('\\');
        data.portada = name[2];


        
    }

    let reg = await producto.findByIdAndUpdate({_id: id},  data);

    if (req.files != undefined) {
        fs.stat('./uploads/products/' + reg.portada, (err, stats) => {
            
            if (!err) {
                fs.unlink('./uploads/products/' + reg.portada, (err, stats) => {
                    if (err) throw err;
                });
            }
        })
    }
    
    
    return res.status(200).send({ok: true, message: 'Prodcuto Actualizado', data: reg});

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

const inventarios_list = async (req, res) => {


    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const id = req.params.id;

    const reg = await Inventario.find({producto: id}).populate('admin producto').sort({createdAt: -1});

    res.status(200).send({ok: true, data:reg})
}

const eliminar_inventario_producto = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const id = req.params.id;

    let reg = await Inventario.findByIdAndRemove({_id: id});

    let prod = await producto.findById(reg.producto);
    let newStock = parseInt(prod.stock)  - parseInt(reg.cantidad);

    let product = await producto.findByIdAndUpdate({_id: reg.producto}, {
        stock: newStock
    })

    res.status(200).send({ok: true, message: `Se eliminaron ${reg.cantidad} de ${prod.titulo}`, data:product})
}

const add_inventary_producto = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    let { cantidad } = req.body;

    let addInventary = await Inventario.create(req.body);


    let prod = await producto.findById(req.body.producto);
    let newStock = parseInt(prod.stock)  + parseInt(cantidad);

    let product = await producto.findByIdAndUpdate({_id: req.body.producto}, {
        stock: newStock
    })


    res.status(200).send({ok: true, message: `Se agregaron ${cantidad} unidades a ${product.titulo}` , data:addInventary})


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


const BorrarProductoAdmin = async (req, res) => {


    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const id = req.params.id;


    try {
        const deleted = await producto.findByIdAndDelete({_id: id});

        fs.stat('./uploads/products/' + deleted.portada, (err, stats) => {
            
            if (!err) {
                fs.unlink('./uploads/products/' + deleted.portada, (err, stats) => {
                    if (err) throw err;
                });
            }
        })

        return res.status(200).send({ok: true, message: deleted.titulo + ' Eliminado'});
    } catch (error) {
        return res.status(500).send({ok: false, message:'Hubo un error, comunicate con el administrador.'});
    }

    
}

const actualizar_producto_variedad = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const data = {...req.body};
    const id = req.params.id;


    let reg = await producto.findByIdAndUpdate({_id: id},  data);

    
    
    return res.status(200).send({ok: true, message: 'Variedades Actualizadas', data: reg});

}
const actualizar_producto_galeria = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const data = {...req.body};
    const id = req.params.id;

    var img_path = req.files.img.path;
    var name = img_path.split('\\');
    var img_name = name[2];



    let reg = await producto.findByIdAndUpdate({_id: id},  {$push: {galeria: {
        img: img_name,
        _id: data._id
    }}});

    
    
    return res.status(200).send({ok: true, message: 'Galeria Actualizada', data: reg});

}
const eliminar_producto_galeria = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const data = {...req.body};
    const id = req.params.id;



    let reg = await producto.findByIdAndUpdate({_id: id},  {$pull: {galeria: {
        _id: data._id
    }}});

    fs.stat('./uploads/products/' + data.img, (err, stats) => {
            
        if (!err) {
            fs.unlink('./uploads/products/' + data.img, (err, stats) => {
                if (err) throw err;
            });
        }
    })


    
    
    return res.status(200).send({ok: true, message: 'Galeria Actualizada', data: reg});

}

module.exports = {
    registro_producto_admin,
    productos_list,
    getProductById,
    obtener_Portada,
    actualizar_producto_admin,
    BorrarProductoAdmin,
    inventarios_list,
    eliminar_inventario_producto,
    add_inventary_producto,
    actualizar_producto_variedad,
    actualizar_producto_galeria,
    eliminar_producto_galeria
}