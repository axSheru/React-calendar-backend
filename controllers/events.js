const express = require("express");
const Evento = require("../models/Evento");


const getEventos = ( req, res = express.response ) => {

    res.json({
        ok: true,
        msg: 'getEventos.'
    });

};
const crearEvento = async ( req, res = express.response ) => {

    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.status( 201 ).json({
            ok: true,
            msg: 'Evento guardado correctamente.',
            evento: eventoGuardado
        });
        
    } catch (error) {

        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador.'
        });
        
    }

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