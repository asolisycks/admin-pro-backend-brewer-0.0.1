const { response } = require('express');

const Cerveceria = require('../models/cerveceria');

const getCerveceria = async(req, res = response) => {

    const cervecerias = await Cerveceria.find()
        .populate('usuario', 'nombre email img') //nos traemos los campos de la tabla usuario

    try {
        res.json({
            ok: true,
            cervecerias
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const crearCerveceria = async(req, res = response) => {

    const uid = req.uid;

    const brewer = new Cerveceria({
        usuario: uid,
        ...req.body
    });

    console.log(uid);

    try {

        const cerveceriaDB = await brewer.save();

        res.json({
            ok: true,
            brewer: cerveceriaDB
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};

const actualizarCerveceria = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'actualizarCerveceria'
    });
};

const borrarCerveceria = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'borrarCerveceria'
    });
};

module.exports = {
    getCerveceria,
    crearCerveceria,
    actualizarCerveceria,
    borrarCerveceria
};