const { response } = require('express');
const Cerveza = require('../models/cerveza');

const getCervezas = async(req, res = response) => {

    const cervezas = await Cerveza.find() //nos traemos los campos de la tabla usuario
        .populate('usuario', 'nombre email img')
        .populate('cerveceria', 'nombre img');

    try {
        res.json({
            ok: true,
            cervezas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const crearCerveza = async(req, res = response) => {

    const uid = req.uid;
    const cerveza = new Cerveza({
        usuario: uid,
        ...req.body
    });

    console.log(uid);

    try {

        const cervezaDB = await cerveza.save();

        res.json({
            ok: true,
            cerveza: cervezaDB
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const actualizarCerveza = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarCerveza'
    });
};

const borrarCerveza = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarCerveza'
    });
};

module.exports = {
    getCervezas,
    crearCerveza,
    actualizarCerveza,
    borrarCerveza
};