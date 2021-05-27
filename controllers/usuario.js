const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuarioGet = (req, res = response) => {

    const { limit = 100, from = 0} = req.query;

    const usuarios = await Usuario.find()
        .skip( Number( from ) )
        .limit( Number( limit ) )

    const total = await Usuario.countDocuments();
    
    res.status(200).json({
        total,
        usuarios
    })

};

const usuarioPost = async(req, res = response) => {
    const { user, password, score } = req.body;

    const usuario = new Usuario({ user, password, score });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.status(200).json({
        msg: 'Usuario registrado correctamente!',
        usuario
    });
};

const usuarioPut = async(req, res = response) => {
    const { id } = req.params;

    const { score } = req.body;

    const usuario = await Usuario.findByIdAndUpdate( id, {score} );

    res.status(200).json({
        id,
        msg: 'El usuario ha sido actualizado correctamente'
    })
};

module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut
}