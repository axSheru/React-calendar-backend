/* 
Rutas de eventos / events
host + /api/events
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

// Todas pasan por el middleware de validarJWT.
router.use( validarJWT );

// Obtener eventos.
router.get(
    '/',
    getEventos
);

// Crear un nuevo evento.
router.post(
    '/',
    [
        check( 'title', 'El título es obligatorio.' ).not().isEmpty(),
        check( 'start', 'La fecha de inicio no es válida.' ).custom( isDate ),
        check( 'end', 'La fecha de finalización no es válida.' ).custom( isDate ),
        validarCampos
    ],
    crearEvento
);

// Actualizar evento.
router.put(
    '/:id',
    actualizarEvento
);

// Eliminar evento.
router.delete(
    '/:id',
    eliminarEvento
);

module.exports = router;