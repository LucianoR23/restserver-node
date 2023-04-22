
const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, usersPut, usersPost, usersDelete, usersPatch } = require('../controllers/users');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste } = require('../helpers/db-validators');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut)

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria y debe ser de mas de 6 caracteres').isLength({ min: 6 }),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', "USER_ROLE"]),
    check('rol').custom( esRoleValido ),
    validarCampos
] ,usersPost)

router.delete('/', usersDelete)

router.patch('/', usersPatch)





module.exports = router;