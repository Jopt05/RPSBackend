const { validationResult } = require("express-validator");
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

const validarCampos = (req,res,next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    };

    next();
};

const existeUsuarioPorId = async(id='') => {
    const existeId = await Usuario.findById(id);
    
    if( !existeId ) {
        throw new Error(`El id ${id} no existe en la base de datos`);
    };
}

const validarJWT = ( req, res, next ) => {

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición',
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        req.uid = uid;

        next();
        
    } catch (error) {

        console.log('Error');
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }
    
}

module.exports = {
    validarCampos,
    existeUsuarioPorId,
    validarJWT
}