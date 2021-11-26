'use strict'
var admin = require('../Models/admin');
var bcrypt = require('bcrypt-nodejs');
const { generateJWT } = require('../Helpers/jwt');


const registro_admin = async (req, res) => {
    //recibe los datos del frontEnd
    var data = req.body;

    var admins_arr = [];

    // Busca en la base de datos si ya existe el correo
    admins_arr = await admin.find({email: data.email});
    if (admins_arr.length === 0) {
        
        if (data.password) {
            bcrypt.hash(data.password, null, null, async (err, hash) => {
                if (hash) {
                    data.password = hash;

                    // Realiza el registro a la base de datos
                    var reg = await admin.create(data)

                    // Regresa la información
                    res.json({ok: true, message: 'Administrador registrado correctamente.', data: reg})
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

const login_admin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existsUser = await admin.findOne({email});

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
        const token = await generateJWT(existsUser);

        res.json({data: existsUser, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        });
    }
}


module.exports = {
    registro_admin,
    login_admin
}
