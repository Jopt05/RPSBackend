const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPost, usuarioPut } = require('../controllers/usuario');
const { validarCampos, existeUsuarioPorId, validarJWT } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuarioGet)

router.post('/', 
[
    check('user', 'El usuario no puede estar vacío').not().isEmpty(),
    check('password', 'La password no puede quedar vacía').isLength({ min: 6 }),
    check('score', 'La contraseña no puede estar vacía').not().isEmpty(),
    validarCampos
]
,usuarioPost)

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
]
,usuarioPut)

module.exports = router;