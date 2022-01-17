'use strict'
var cliente = require('../Models/cliente');
var bcrypt = require('bcrypt-nodejs');
const { generateJWT } = require('../Helpers/jwt');

const registro_cliente = async (req, res) => {
    //recibe los datos del frontEnd
    var data = req.body;

    var clientes_arr = [];

    // Busca en la base de datos si ya existe el correo
    clientes_arr = await cliente.find({email: data.email});
    if (clientes_arr.length === 0) {
        
        if (data.password) {
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if (hash) {
                    data.password = hash;

                    // Realiza el registro a la base de datos
                    var reg = await cliente.create(data)

                    // Regresa la información
                    res.json({ok: true, message: 'Usuario registrado correctamente.', data: reg})
                }else {
                    res.status(500).send({ok: false, message: 'Error, contacta al administrador.', data: undefined})
                }
            })
        }else {
            res.status(400).send({ok: false, message: 'La contraseña es obligatoria.',data: undefined})
        }


    }else {
        res.status(400).send({ok: false, message: 'El correo ya a sido registrado, elige otro', data: undefined})
    }

    

}

const login_cliente = async (req, res) => {

    const { email, password } = req.body;


    try {
        const existsUser = await cliente.findOne({email});

        if (!existsUser) {
            return res.status(404).json({
                ok: false,
                message: 'Email no encontrado'
            });
        }

        const validPassword =  bcrypt.compareSync(password, existsUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseña incorrecta'
            });
        }

        // Genera el JWT
        const token = await generateJWT(existsUser._id);

        res.json({data: existsUser, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
}

const regsitro_cliente_admin = async (req, res) => {

    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    var clientes_arr = [];

    var data = await req.body;

    // Busca en la base de datos si ya existe el correo
    clientes_arr = await cliente.find({email: data.email});

    if (clientes_arr.length !== 0) {
        return res.status(500).send({
            ok: false,
            message: 'Error, este correo ya esta registrado.'
        }); 
    }

    bcrypt.hash('123456789', null, null, async (err, hash) => {

        if (!hash) {

            res.status(500).send({
                ok: false,
                message: 'Hubo un error.'
            });
        }

        data.password = hash;
        let reg = await cliente.create(data);
        return res.status(200).send({ok: true, data: reg})



    })
    
    


}

const ActualizarClienteAdmin = async (req, res) => {


    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const id = req.params.id;

    const cambiosCliente = {
        ...req.body,
    }

    try {
        const client = await cliente.findByIdAndUpdate({_id: id}, cambiosCliente);
        return res.status(200).send({ok: true, cliente: client});
    } catch (error) {
        return res.status(500).send({ok: false, message:'Hubo un error, comunicate con el administrador.'});
    }

    
}
const BorrarClienteAdmin = async (req, res) => {


    if (!req.uid || req.role !== 'ADMIN') {
        return res.status(500).send({
            ok: false,
            message: 'Error, no tienes permisos.'
        }); 
    }

    const id = req.params.id;


    try {
        await cliente.findByIdAndDelete({_id: id});
        return res.status(200).send({ok: true, message: 'Cliente Eliminado'});
    } catch (error) {
        return res.status(500).send({ok: false, message:'Hubo un error, comunicate con el administrador.'});
    }

    
}

const cliente_list = async (req, res) => {

    let tipo = req.params.tipo;
    let filtro = req.params.filter;

    if (tipo != 'all') {
        // filtro
        if (tipo === 'ap') {
            
            let reg = await cliente.find({apellidos: new RegExp(filtro, 'i') });
            res.status(200).send({data:reg});
            return;

        }else if (tipo === 'email') {
            let reg = await cliente.find({email: new RegExp(filtro, 'i') });
            res.status(200).send({data:reg});
            return;
        }
    }

    let reg = await cliente.find();
    res.status(200).send({data:reg})
}

const getClienteById = async (req, res) => {
    const id = req.params.id;

    try {

        const client = await cliente.findById(id);

        // client.password = bcrypt.

        res.status(200).send({
            ok: true,
            client
        })
        
    } catch (error) {
        res.status(500).send({
            ok: false,
            message: error.message + ''
        });
    }

}


const ActualizarClienteGuest = async (req, res) => {


    

    const id = req.params.id;

    const data = {
        ...req.body,
    }

    
    if (data.password) {
        console.log(data.password);
        bcrypt.hash(data.password, null, null, async (err, hash) => {
            if (hash) {
                data.password = hash;

                try {
                    console.log('hay pass');
                    const client = await cliente.findByIdAndUpdate({_id: id}, {
                        nombres: data.nombres,
                        apellidos: data.apellidos,
                        telefono: data.telefono,
                        f_nacimiento: data.f_nacimiento,
                        dni: data.dni,
                        genero: data.genero,
                        pais: data.pais,
                        password: data.password
                    });
                    return res.status(200).send({ok: true, cliente: client});
                } catch (error) {
                    return res.status(500).send({ok: false, message:'Hubo un error, comunicate con el administrador.'});
                }
            

                
            }else {
                res.status(500).send({ok: false, message: 'Error, contacta al administrador.', data: undefined})
                return;
            }
        })
    }else
    {
        try {
            console.log('no hay pass');
            const client = await cliente.findByIdAndUpdate({_id: id}, {
                nombres: data.nombres,
                apellidos: data.apellidos,
                telefono: data.telefono,
                f_nacimiento: data.f_nacimiento,
                dni: data.dni,
                genero: data.genero,
                pais: data.pais,
            });
            return res.status(200).send({ok: true, cliente: client});
        } catch (error) {
            return res.status(500).send({ok: false, message:'Hubo un error, comunicate con el administrador.'});
        }
    }

    

    
}




module.exports = {
    registro_cliente,
    login_cliente,
    cliente_list,
    regsitro_cliente_admin,
    getClienteById,
    ActualizarClienteAdmin,
    BorrarClienteAdmin,
    ActualizarClienteGuest
}