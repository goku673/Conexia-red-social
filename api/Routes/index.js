const {Router} = require('express');
const rutaPrincipal  = Router();
// RUTAS DE USUARIOS
const userRouter   = require('./Usuario/Usuario-router')

// RUTAS DE PUBLICACIONES
const publicacionRouter = require('./Publicacion/Publicacion-router');

// RUTAS DE SEGUIDORES
const followRouter     = require('./Seguidor/Seguidor-router')

// RUTAS PARA CREAR MENSAJES
const rutaMensaje    = require('../Routes/Mensaje/index.js');

// RUTAS PARA COMENTARIOS;
const rutaComentario = require('../Routes/Comentario/index.js');

// RUTAS PARA EMOTICONES 
const { routerEmoticon } = require('../Routes/Emoticons/index.js');




// RUTAS DE USUARIOS
rutaPrincipal.use('/user', userRouter)

// RUTAS DE PUBLICACIONES
rutaPrincipal.use('/publicacion', publicacionRouter);

// RUTAS DE SEGUIDORES
rutaPrincipal.use('/follow', followRouter)

//  RUTAS PARA CREAR MENSAJES
rutaPrincipal.use('/mensaje',rutaMensaje);

//RUTAS PARA EMOTICONES 
rutaPrincipal.use('/emoticon', routerEmoticon);

//RUTAS PARA COMENTARIOS;
rutaPrincipal.use('/comentario',rutaComentario);


module.exports = rutaPrincipal;