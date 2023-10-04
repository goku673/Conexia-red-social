const { Publicacion } = require('../../DB')

const createPostController = async (req) => {
 try {
    const { review, imagenURL, user_id} = req.body;

    if(review && imagenURL&&user_id){
      const post = await Publicacion.create({
         review,
         imagenURL,
         user_id
     });
      return post;
    }
    return {error : "Error en el posteo de publicacion"};
 } catch (error) {
    console.error('Error al crear una publicación:', error);
 }
}


const getAllPostsController = async () => {
   try {
      const posts = await Publicacion.findAll();

      if (posts.length === 0) {
         return { error: 'No se han encontrado publicaciones' };
      }
      
      return posts;

   } catch (error) {
      console.error('Error al obtener posts:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};


const getPostByIdController = async (req) => {
   try {
      const { idPublicacion } = req.params;
      const post = await Publicacion.findByPk(idPublicacion);
      
      if (!post) {
         return { error: 'No se ha encontrado la publicación' };
       }
       return post;
       
   } catch (error) {
      console.error('Error al obtener post por id:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};




const getAllPostsByUserController = async (req) => {
   try {
      const { user_id } = req.params;
      const posts = await Publicacion.findAll({ where: { user_id } });
      
      if (!posts) {
         return { error: 'No se han encontrado publicaciones de ese usuario' };
       }
      
      return posts;

   } catch (error) {
      console.error('Error al obtener posts por usuario:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};


module.exports = {
   createPostController, 
   getAllPostsController,
   getAllPostsByUserController,
   getPostByIdController
};