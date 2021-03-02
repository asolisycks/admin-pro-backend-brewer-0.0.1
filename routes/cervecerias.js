/*
	Brewer
    Ruta: /api/brewers
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getCerveceria,
    crearCerveceria,
    actualizarCerveceria,
    borrarCerveceria
} = require('../controllers/cervecerias');

const router = Router();

router.get('/', getCerveceria);

router.post('/', [
        validarJWT,
        check('nombre', 'El nombre de la cerveceria es necesario').not().isEmpty(),
        validarCampos
    ],
    crearCerveceria
);

router.put('/:id', [],
    actualizarCerveceria
);

router.delete('/:id',
    borrarCerveceria
);


module.exports = router;