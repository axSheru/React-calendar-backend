const bcrypt = require("bcryptjs");
const express = require("express");
const { validationResult } = require("express-validator");
const { generarJWT } = require("../helpers/jwt");
const Usuario = require("../models/Usuario");



const createUser = async ( req, res = express.response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        
        if ( usuario ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'El email ingresado ya está en uso.'
            });
        }

        usuario = new Usuario( req.body );

        // Encriptar contraseña.
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
    
        await usuario.save();

        // Generar JWT.
        const token = await generarJWT( usuario.id, usuario.name );
        
        res.status( 201 ).json({
            ok: true,
            msg: 'Registrado con éxito',
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {

        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador.'
        });
        
    }
};


const loginUser = async ( req, res = express.response ) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });
        
        if ( ! usuario ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'El email ingresado no está registrado.'
            });
        }

        // Validar contraseña.
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        
        if ( ! validarPassword ) {
            return res.status( 400 ).json({
                ok: false,
                msg: 'Contraseña incorrecta.'
            });
        }

        // Generar JWT.
        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            ok: true,
            msg: 'Inicio de sesión exitoso.',
            uid: usuario.id,
            name: usuario.name,
            token
        });
        
    } catch (error) {

        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador.'
        });
        
    }
};

const renewToken =  async ( req, res = express.response ) => {

    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        msg: 'Token renewed',
        token
    });
};



module.exports = {
    createUser,
    loginUser,
    renewToken
};
