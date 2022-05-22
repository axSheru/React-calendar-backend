const express = require("express");


const getEventos = ( req, res = express.response ) => {

    res.json({
        ok: true,
        msg: 'getEventos.'
    });

};
const crearEvento = ( req, res = express.response ) => {

    res.json({
        ok: true,
        msg: 'crearEvento.'
    });

};
const actualizarEvento = ( req, res = express.response ) => {

    res.json({
        ok: true,
        msg: 'actualizarEvento.'
    });

};
const eliminarEvento = ( req, res = express.response ) => {

    res.json({
        ok: true,
        msg: 'eliminarEvento.'
    });

};

/* {
    ok: true,
    msg: 'Evento llamado....'
}
 */

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
};