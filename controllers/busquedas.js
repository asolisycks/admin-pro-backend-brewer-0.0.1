const { response } = require('express');

const Usuario = require('../models/usuario');
const Cerveceria = require('../models/cerveceria');
const Cerveza = require('../models/cerveza');

const { Promise } = require('mongoose');
//getTodo

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    /*const usuarios = await Usuario.find({
        nombre: regex
    });

    const cervezas = await Cerveza.find({
        nombre: regex
    });

    const cervecerias = await Cerveceria.find({
        nombre: regex
    });*/

    const [usuarios, cervezas, cervecerias] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Cerveza.find({ nombre: regex }),
        Cerveceria.find({ nombre: regex }),
    ]);

    res.json({
        ok: true,
        usuarios,
        cervezas,
        cervecerias
    })
}

const getDocumentoColeccion = async(req, res = response) => {

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    let data = [];

    switch (tabla) {
        case 'cervecerias':
            data = await Cerveceria.find({ nombre: regex })
                .populate('usuario', 'nombre img');
            break;
        case 'cervezas':
            data = await Cerveza.find({ nombre: regex })
                .populate('usuario', 'nombre img')
                .populate('cerveceria', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({ nombre: regex });
            break;
        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla tiene que ser usuarios/cervecerias/cervezas'
            });
    }

    res.json({
        ok: true,
        resultados: data
    });
}

module.exports = {
    getTodo,
    getDocumentoColeccion
}