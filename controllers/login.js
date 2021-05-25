const { response } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async( req, res = response ) => {
    
    const { user, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ user });

        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            })
        }

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) {
            return res.status(400).json({
                msg: 'Password incorrecta',
            })
        }

        const token = await generarJWT(usuario.uid);

        res.status(200).json({
            tokenId: token,
            usuario
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

module.exports = {
    login
}