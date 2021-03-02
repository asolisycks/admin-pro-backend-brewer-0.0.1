const fs = require('fs');

const Usuario = require('../models/usuario');
const Cerveceria = require('../models/cerveceria');
const Cerveza = require('../models/cerveza');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
}

const actualizaImagen = async(tipo, id, nombreArchivo) => {
    console.log(`Vamos bien - ${tipo} - ${id} - ${nombreArchivo}`);

    let pathViejo;

    switch (tipo) {
        case 'cervezas':
            const cerveza = await Cerveza.findById(id);
            if (!cerveza) {
                console.log('No existe la cerveza');
                return false;
            }

            pathViejo = `./uploads/cervezas/${cerveza.img}`;
            //console.log(fs.existsSync(pathViejo));
            //console.log(pathViejo);
            borrarImagen(pathViejo);

            cerveza.img = nombreArchivo;
            await cerveza.save();
            return true;
            break;
        case 'cervecerias':
            const cerveceria = await Cerveceria.findById(id);
            if (!cerveceria) {
                console.log('No existe la cerveceria');
                return false;
            }

            pathViejo = `./uploads/cervezas/${cerveza.img}`;
            //console.log(fs.existsSync(pathViejo));
            //console.log(pathViejo);
            borrarImagen(pathViejo);

            cerveza.img = nombreArchivo;
            await cerveza.save();
            return true;
            break;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No existe el usuario');
                return false;
            }

            pathViejo = `./uploads/usuarios/${usuario.img}`;
            //console.log(fs.existsSync(pathViejo));
            //console.log(pathViejo);
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
        default:
            break;
    }
}

module.exports = {
    actualizaImagen
}