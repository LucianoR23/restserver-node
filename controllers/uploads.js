const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { User, Product } = require('../models');


const cargarArchivo = async( req, res = response ) => {

    if ( !req.files || Object.keys(req.files).length === 0 || !req.files.archivo ) {
        res.status(400).json({msg: 'No hay archivos que subir'});
        return;
    }
    
    try {
        const nombre = await subirArchivo( req.files, undefined, 'imgs' )
        res.json({nombre})
    } catch (msg) {
        res.status(400).json({ msg });
    }

}

const actualizarArchivo = async(req, res = response) => {

    const { collection, id } = req.params

    let modelo;

    switch (collection) {
        case 'users':
            modelo = User.findById(id)
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el usuario con id ${ id }`
                })
            }
            break;
        case 'products':
            modelo = Product.findById(id)
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })

    }

    const nombre = await subirArchivo( req.files, undefined, collection )
    modelo.img = nombre;

    await modelo.save();

    res.json( modelo )

}

module.exports= {
    cargarArchivo,
    actualizarArchivo
}