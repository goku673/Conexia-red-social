const {Router} = require('express');
const createMessage = require('../../handlers/Mensaje/index.js');
const rutaMensaje = Router();

rutaMensaje.post('/createMessage', createMessage);

// ruta get para traer el chat entre los usuarios


module.exports = rutaMensaje;