const {Router} = require('express');
const rutaPrincipal = Router();
const registerUser = require('./Usuario/Usuario-router')
const getAllUsers = require('./Usuario/Usuario-router')
const createPost = require('./Publicacion/Publicacion-router')
const followUser = require('./Seguidor/Seguidor-router')

// RUTAS DE USUARIOS
rutaPrincipal.use('/registerUser', registerUser)
rutaPrincipal.use('/getAllUsers', getAllUsers)

// RUTAS DE PUBLICACIONES
rutaPrincipal.use('/createPost', createPost)

// RUTAS DE SEGUIDORES
rutaPrincipal.use('/followUser', followUser)

module.exports = rutaPrincipal;