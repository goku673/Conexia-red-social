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
      const posts = await Publicacion.findAll({ where: { oculto: false } });

      if (posts.length === 0) {
         return { error: 'No se han encontrado publicaciones' };
      }
      
      return posts;

   } catch (error) {
      console.error('Error al obtener posts:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};



const getHiddenPostsByUserController = async (req) => {
   try {
      const { user_id } = req.params;
      const posts = await Publicacion.findAll({ where: { oculto: true, user_id } });
      
      if (posts.length === 0) {
         return { error: 'No tienes publicaciones en oculto' };
       }
       return posts;
       
   } catch (error) {
      console.error('Error al obtener publicaciones ocultas por usuario:', error);
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
      const posts = await Publicacion.findAll({ where: { oculto:false, user_id } });
      
      if (!posts) {
         return { error: 'No se han encontrado publicaciones de ese usuario' };
       }
      
      return posts;

   } catch (error) {
      console.error('Error al obtener posts por usuario:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};


const hidePostController = async (req) => {
   try {
      const { idPublicacion } = req.params;

      // Actualiza la columna "oculto" a true
      const [rowsAffected] = await Publicacion.update({ oculto: true }, { where: { idPublicacion } });

      if (rowsAffected === 0) {
         return { error: 'No se ha encontrado la publicación' };
       }

      // Consulta la publicación actualizada
      const post = await Publicacion.findOne({ where: { idPublicacion } });

      return post;
      
   } catch (error) {
      console.error('Error al ocultar post:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};


const showPostController = async (req) => {
   try {
      const { idPublicacion } = req.params;
      
      // Actualiza la columna "oculto" a false
      const [rowsAffected] = await Publicacion.update({ oculto: false }, { where: { idPublicacion } });
      
      if (rowsAffected === 0) {
         return { error: 'No se ha encontrado la publicación' };
       }
       // Consulta la publicación actualizada
       const post = await Publicacion.findOne({ where: { idPublicacion } });
       return post;
       
   } catch (error) {
      console.error('Error al mostrar post:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};


const deletePostByIdController = async (req) => {
   try {
      const { idPublicacion } = req.params;

      const post = await Publicacion.destroy({ where: { idPublicacion } });

      if(!post) {
         return { error: 'No se ha encontrado la publicación' };
      }
      
      return post;

   } catch (error) {
      console.error('Error al eliminar post:', error);
      throw error; // Relanzar el error para que se maneje en el handler

   }
};

const updatePostController = async (req) => {
   try {
      const { idPublicacion } = req.params;
      const { review, imagenURL } = req.body;

      // Verificar si la publicación existe
      const post = await Publicacion.findByPk(idPublicacion);

      if (!post) {
         return { error: 'La publicación no existe' };
      }

     await post.update({ review, imagenURL });
     
      return post;
   } catch (error) {
      console.error('Error al actualizar post:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
}


module.exports = {
   createPostController, 
   getAllPostsController,
   getAllPostsByUserController,
   getPostByIdController,
   hidePostController,
   showPostController,
   deletePostByIdController,
   getHiddenPostsByUserController,
   updatePostController
};