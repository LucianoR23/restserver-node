const path = require('path')
const fs = require('fs')
const { response } = require("express");
const { subirArchivo } = require("../helpers");

const { User, Product } = require('../models');


const cargarArchivo = async( req, res = response ) => {
    
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
            modelo = await User.findById(id)
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el usuario con id ${ id }`
                })
            }
            break;
        case 'products':
            modelo = await Product.findById(id)
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe el producto con el id ${id}`
                })
            }
            break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvido validar esto' })


    }
    

    if( modelo.img ){
        const pathImg = path.join( __dirname, '../uploads/', collection, modelo.img )
        if( fs.existsSync( pathImg ) ) {
            fs.unlinkSync( pathImg )
        }
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