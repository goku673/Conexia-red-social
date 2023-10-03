const {Router} = require('express');
const rutaPrincipal  = Router();
const registerUser   = require('./Usuario/Usuario-router')
const getAllUsers    = require('./Usuario/Usuario-router')
const createPost     = require('./Publicacion/Publicacion-router')
const followUser     = require('./Seguidor/Seguidor-router')
const rutaMensaje    = require('../Routes/Mensaje/index.js');
const rutaComentario = require('../Routes/Comentario/index.js');
const { routerEmoticon } = require('../Routes/Emoticons/index.js');

// RUTAS DE USUARIOS
rutaPrincipal.use('/registerUser', registerUser)
rutaPrincipal.use('/getAllUsers', getAllUsers)

// RUTAS DE PUBLICACIONES
rutaPrincipal.use('/createPost', createPost)

// RUTAS DE SEGUIDORES
rutaPrincipal.use('/followUser', followUser)

//  RUTAS PARA CREAR MENSAJES
rutaPrincipal.use('/createMessage',rutaMensaje);

//RUTAS PARA EMOTICONES 
rutaPrincipal.use('/createEmoticon', routerEmoticon);

//RUTAS PARA COMENTARIOS;
rutaPrincipal.use('/comentario',rutaComentario);


module.exports = rutaPrincipal;