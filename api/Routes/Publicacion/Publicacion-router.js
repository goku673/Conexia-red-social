const { Router } = require('express');
const {
  createPost,
  getAllPosts,
  getAllPostsByUser,
  getPostById,
  hidePost,
  showPost,
  deletePostById,
  getHiddenPostsByUser,
  updatePost,
  getPost1
} = require('../../handlers/Publicacion/handlerPublicacion');
const upload = require('../../services/multer');

const publicacionRouter = Router();

//router.post("/register",upload.single('imagen'), userRegister);
publicacionRouter.post('/create',upload.single('imagen'), createPost);
publicacionRouter.get('/all', getAllPosts);
publicacionRouter.get('/byUserId/:user_id', getAllPostsByUser);
publicacionRouter.get('/byPostId/:idPublicacion', getPostById);
publicacionRouter.put('/hide/:idPublicacion', hidePost);
publicacionRouter.put('/show/:idPublicacion', showPost);
publicacionRouter.delete('/delete/:idPublicacion', deletePostById);
publicacionRouter.get('/getHiddenPostsByUserId/:user_id', getHiddenPostsByUser);
publicacionRouter.put('/update/:idPublicacion', updatePost);
publicacionRouter.get('/prueba',getPost1)

//ruta para actualizar la informacion de una publicacion
// cantidad de likes por publicacion


module.exports = publicacionRouter;
