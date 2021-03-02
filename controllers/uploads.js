const path = require('path');
const fs = require('fs');

const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { actualizaImagen } = require('../helpers/actualiza-imagen');

const fileUpload = (req, res = response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validar tipos
    const tiposValidos = ['cervecerias', 'cervezas', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un tipo valido'
        });
    }

    //Validar que exista un archivo.
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo'
        });
    }

    try {
        //Procesar la imagen...
        const file = req.files.imagen;
        //console.log(file);

        //Vaidar extensiones
        const nombreCortado = file.name.split('.');
        const extArchivo = nombreCortado[nombreCortado.length - 1];

        //Extensiones validas
        const extValidas = ['png', 'jpg', 'jpeg', 'gif'];

        if (!extValidas.includes(extArchivo)) {
            return res.status(400).json({
                ok: false,
                msg: 'No es una ext permitida'
            });
        }

        //Generar el nombre del archivo
        const nombreArchivo = `${ uuidv4()}.${extArchivo}`;

        //Path para guardar la imagen
        const path = `./uploads/${ tipo }/${ nombreArchivo }`;

        //use mv method to place the file somewhere on your server
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    ok: false,
                    msg: 'Error al mover la imagen'
                });
            }

            //
            console.log('Actualiza'); //Actualizar base de datos
            actualizaImagen(tipo, id, nombreArchivo);

            res.status(200).json({
                ok: true,
                msg: 'El archivo se cargo con éxito.',
                nombreArchivo
            });
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}


const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image-available.jpg`);
        res.sendFile(pathImg);
    }
}


module.exports = {
    fileUpload,
    retornaImagen
}