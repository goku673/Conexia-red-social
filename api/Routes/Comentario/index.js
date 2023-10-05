const {Router} = require('express');
const createComentario = require('../../handlers/Comentario/index.js');
const rutaComentario = Router();

rutaComentario.post('/createComentario',createComentario);


//actualizar comentario
// borrar comentario

module.exports = rutaComentario;