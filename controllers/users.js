const {response, request} = require('express')

const usersGet = (req = request, res = response) => {

    const {q, nombre = 'No name'} = req.query;
    
    res.json({
        msg: 'get API - controlador',
        code: 2310,
        q,
        nombre
    })
}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controlador',
        code: 2310,
        id
    })
}

const usersPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post API - controlador',
        code: 2310,
        nombre,
        edad
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