const {Router} = require('express');
const createMessage = require('../../handlers/Mensaje/index.js');
const rutaMensaje = Router();

rutaMensaje.post('/createMessage', createMessage);


module.exports = rutaMensaje;