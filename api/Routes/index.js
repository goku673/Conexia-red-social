const {Router} = require('express');
const rutaPrincipal = Router();
const registerUser = require('./Usuario/Register-router')
const createPost = require('./Publicacion/createPost-router')
const followUser = require('./Seguidor/followUser-router')

rutaPrincipal.use('/registerUser', registerUser)
rutaPrincipal.use('/createPost', createPost)
rutaPrincipal.use('/followUser', followUser)

module.exports = rutaPrincipal;