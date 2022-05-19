const express = require("express");
const { validationResult } = require("express-validator");
const Usuario = require("../models/Usuario");



const createUser = async ( req, res = express.response ) => {

    // const { name, email, password } = req.body;

    try {

        const usuario = new Usuario( req.body );
    
        await usuario.save();
        
        res.status( 201 ).json({
            ok: true,
            msg: 'registro'
        });
        
    } catch (error) {

        console.log( error );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor comuníquese con el administrador.'
        });
        
    }
};


const loginUser = ( req, res = express.response ) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'login',
        email,
        password
    });
};

const renewToken =  ( req, res = express.response ) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
};



module.exports = {
    createUser,
    loginUser,
    renewToken
};
