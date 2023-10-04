const { Router } = require('express');
const {
  createPost,
  getAllPosts,
  getAllPostsByUser,
  getPostById,
  hidePost,
  showPost,
  deletePostById
} = require('../../handlers/Publicacion/handlerPublicacion');

const publicacionRouter = Router();

publicacionRouter.post('/create', createPost);
publicacionRouter.get('/all', getAllPosts);
publicacionRouter.get('/byUserId/:user_id', getAllPostsByUser);
publicacionRouter.get('/byPostId/:idPublicacion', getPostById);
publicacionRouter.put('/hide/:idPublicacion', hidePost);
publicacionRouter.put('/show/:idPublicacion', showPost);
publicacionRouter.delete('/delete/:idPublicacion', deletePostById);

module.exports = publicacionRouter;
