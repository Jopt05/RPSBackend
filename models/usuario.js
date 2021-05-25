const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    user: {
        type: String,
        required: [true, 'El usuario es obligatorio'],
    },
    password: {
        type: String,
        required: [true, 'La pass es obligatoria'],
    },
    score: {
        type: Number,
        required: [true, 'El puntaje es obligatorio'],
        default: 0
    },
});

UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );