'use strict'
// var jwt = require('jwt-simple')
const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    // //Leer el token
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No autorizathe'
        })
    }

    try {
        // const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        const { sub, role } = jwt.verify(token, 'maumendez2021')
        // var payload = jwt.decode(token, 'maumendez2021')
        // console.log(role);
        req.uid = sub;
        req.role = role;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No autorizathe'
        })
    }
}

module.exports={
    validateJWT
}