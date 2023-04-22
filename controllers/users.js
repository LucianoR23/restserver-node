const {response, request} = require('express');
const bcryptjs = require('bcryptjs')

const User = require('../models/user');

const usersGet = (req = request, res = response) => {

    const {q, nombre = 'No name'} = req.query;
    
    res.json({
        msg: 'get API - controlador',
        code: 2310,
        q,
        nombre
    })
}

const usersPut = async(req, res = response) => {

    const id = req.params.id;
    const { password, google, ...resto } = req.body;

    if( password ) {
        // Encriptar contra
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const userDB = await User.findByIdAndUpdate( id, resto )


    res.json({
        msg: 'put API - controlador',
        code: 2310,
        userDB
    })
}

const usersPost = async(req, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const user = new User({nombre, correo, password, rol});

    // Encriptar contra
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt )

    // Guardar en BD
    await user.save();

    res.json({
        user
    })
};

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador',
        code: 2310
    })
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador',
        code: 2310
    })
};

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}