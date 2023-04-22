const Role = require('../models/role');
const User = require('../models/user');

const esRoleValido = async(rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`)
    }
};

const emailExiste = async(correo = '') => {
    const existEmail = await User.findOne({ correo })
    if( existEmail ) {
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
};

module.exports = {
    esRoleValido, 
    emailExiste
}