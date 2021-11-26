'use strict'
const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-simple');
const moment = require('moment');

var secret = 'maumendez2021';



const generateJWT = (user)=> {

    return new Promise((resolve, reject)=>{

        const payload = {
            sub: user._id,
            nombres: user.nombres,
            nombres: user.apellidos,
            apellidos: user.apellidos,
            email: user.email,
            role: user.rol
        }
    
        jwt.sign(payload, secret, {
            expiresIn: '12h'
        }, (error, token)=>{
            if (error) {
                console.log(error);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        });
    })


}




module.exports = {
    generateJWT
}