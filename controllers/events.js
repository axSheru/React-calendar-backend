const express = require("express");
const { findByIdAndUpdate } = require("../models/Evento");
const Evento = require("../models/Evento");


const getEventos = async ( req, res = express.response ) => {

    try {

        const eventos = await Evento.find().populate( 'user', 'name' );
    
        res.json({
            ok: true,
            msg: 'Eventos encontrados.',
            eventos
        });
        
    } catch (error) {

        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador.'
        });
        
    }

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
const actualizarEvento = async ( req, res = express.response ) => {

    const eventoID = req.params.id;
    const uid = req.uid;

    try {

        const evento = await Evento.findById( eventoID );

        if ( ! evento ) {
            
            res.status( 404 ).json({
                ok: false,
                msg: 'Evento no encontrado.'
            });

        }

        if ( evento.user.toString() !== uid ) {

            res.status( 401 ).json({
                ok: false,
                msg: 'No tiene permisos para realizar esta acción.'
            });

        }

        const cambiosEvento = {
            ...req.body,
            user: uid
        };

        const eventoActualizado = await Evento.findByIdAndUpdate( eventoID, cambiosEvento, { new: true } );

        res.json({
            ok: true,
            msg: 'Evento actualizado correctamente.',
            evento: eventoActualizado
        });
        
    } catch (error) {

        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador.'
        });
        
    }

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