/* 
Rutas de usuarios / Auth
host + /api/auth
 */

const { Router } = require( 'express' );
const { check } = require('express-validator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post(
    '/new',
    [// Middlewares.
        check( 'name', 'The field name is required.' ).not().isEmpty(),
        check( 'email', 'The field email is not valid.' ).isEmail(),
        check( 'password', 'The field password should be at least 6 characters long.' ).isLength({ min: 6 }),
        validarCampos
    ],
    createUser
);

router.post(
    '/',
    [
        check( 'email', 'The field email is not valid.' ).isEmail(),
        check( 'password', 'The field password should be at least 6 characters long.' ).isLength({ min: 6 }),
        validarCampos
    ],
    loginUser
);

router.get( '/renew', validarJWT, renewToken );


module.exports = router;