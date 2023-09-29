const { Router} = require('express');
const createPost = require('../../handlers/Publicacion/handlerPublicacion')

const router = Router();

router.post('/', createPost);

module.exports = router;