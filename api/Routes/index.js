const {Router} = require('express');
const rutaPrincipal = Router();
const registerUser = require('./Usuario/Register-router')
const createPost = require('./Publicacion/createPost-router')

rutaPrincipal.use('/registerUser', registerUser)
rutaPrincipal.use('/createPost', createPost)


module.exports = rutaPrincipal;