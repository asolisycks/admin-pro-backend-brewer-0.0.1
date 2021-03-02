/*
	Beers
    Ruta: /api/beers
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCervezas,
    crearCerveza,
    actualizarCerveza,
    borrarCerveza
} = require('../controllers/cervezas');

const router = Router();


router.get('/', getCervezas);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la cerveza es necesario').not().isEmpty(),
        check('cerveceria', 'El nombre de la cerveceria debe ser valido').isMongoId(),
        validarCampos
    ],
    crearCerveza
);

router.put('/:id', [],
    actualizarCerveza
);

router.delete('/:id',
    borrarCerveza
);

module.exports = router;