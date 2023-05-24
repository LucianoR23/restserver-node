const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { cargarArchivo, actualizarArchivo } = require('../controllers/uploads');
const { coleccionesPermitdas } = require('../helpers');


const router = Router();

router.post('/', cargarArchivo)

router.put('/:collection/:id', [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => coleccionesPermitdas( c, ['users', 'products'] ) ),
    validarCampos,
], actualizarArchivo)

module.exports = router;