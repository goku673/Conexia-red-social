const { Router } = require('express');
const {
  createPost,
  getAllPosts,
  getAllPostsByUser,
  getPostById,
} = require('../../handlers/Publicacion/handlerPublicacion');

const publicacionRouter = Router();

publicacionRouter.post('/create', createPost);
publicacionRouter.get('/all', getAllPosts);
publicacionRouter.get('/byUserId/:user_id', getAllPostsByUser);
publicacionRouter.get('/byPostId/:idPublicacion', getPostById);

module.exports = publicacionRouter;
