const { Publicacion, Usuario, Emoticon, Comentario } = require('../../DB.js');

const dotenv = require('dotenv');
dotenv.config();
const { Storage } = require('@google-cloud/storage');




const storage = new Storage({
   projectId: process.env.PROYECT_ID,
   credentials: {
      private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
      client_email: process.env.CLIENT_EMAIL,
   }
});

const bucket = storage.bucket(process.env.MY_BUCKET_URL);

const createPostController = async (req) => {
   try {
      const { review, user_id, colorFondo, colorTexto } = req.body; // Recoger los nuevos campos

      const imagen = req.file;
      let imagenURL = null;

      // Si se proporciona una imagen, la sube a Firebase
      if (imagen) {
         let remoteFileName = imagen.filename;

         // Obtiene la extensión del archivo
         await bucket.upload(imagen.path, {
            destination: remoteFileName,
            public: true,
            metadata: { contentType: 'image/jpeg' }, // soporta imangenes png jpg y gif
         });

         imagenURL = `https://firebasestorage.googleapis.com/v0/b/red-conexia.appspot.com/o/${encodeURIComponent(remoteFileName)}?alt=media`;
      }
      // para los emoticones 


      if ((review || imagenURL) && user_id) {
         const post = await Publicacion.create({
            review,
            imagenURL,
            user_id,
            colorFondo, // Guardar el color de fondo
            colorTexto, // Guardar el color del texto
         });

         return post;
      }
      return { error: "Error en el posteo de publicacion" };
   } catch (error) {
      console.error('Error al crear una publicación:', error);
   }
}


const getAllPostsController = async () => {
   try {
      const posts = await Publicacion.findAll({
         where: { oculto: false },
         include: [
            {
               model: Usuario,
               as: 'usuarioQuienPublico',
               attributes: ['nombre', 'imagenURL']
            },
            {
               model: Comentario,
               attributes: ['idComentario', 'date', 'comentario', 'idUser', 'idPublicacion'],
               include: [
                  {
                     model: Usuario,
                     as: 'usuarioComentario', // Usamos el alias definido en la asociación
                     attributes: ['id', 'nombre', 'imagenURL'],
                  }
               ]
            },
            {
               model: Emoticon,
               attributes: ['typeEmoticon'],
               include: [
                  {
                     model: Usuario,
                     as: 'usuarioEmoticon', // Usamos el alias definido en la asociación
                     attributes: ['id', 'nombre', 'imagenURL']
                  }
               ]
            }
         ]
      });

      if (posts.length === 0) {
         return { error: 'No se han encontrado publicaciones' };
      }

      // Usamos el método get({ plain: true }) para obtener solo los datos reales
      const plainPosts = posts.map(post => post.get({ plain: true }));


      return plainPosts;

   } catch (error) {
      console.error('Error al obtener posts:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
};
// esto es prueba 
const getPostController1 = async () => {
   try {
      const posts = await Publicacion.findAll({
         where: { oculto: false },
         include: [
            {
               model: Usuario,
               as: 'usuarioQuienPublico',
               attributes: ['nombre', 'imagenURL']
            },
            {
               model: Comentario,
               attributes: ['idComentario', 'date', 'comentario', 'idUser', 'idPublicacion'],
               include: [
                  {
                     model: Usuario,
                     as: 'usuarioComentario', // Usamos el alias definido en la asociación
                     attributes: ['id', 'nombre', 'imagenURL']
                  }
               ]
            },
            {
               model: Emoticon,
               attributes: ['typeEmoticon'],
               include: [
                  {
                     model: Usuario,
                     as: 'usuarioEmoticon', // Usamos el alias definido en la asociación
                     attributes: ['id', 'nombre', 'imagenURL']
                  }
               ]
            }
         ]
      });

      if (posts.length === 0) {
         return { error: 'No se han encontrado publicaciones' };
      }

      // Usamos el método get({ plain: true }) para obtener solo los datos reales
      const plainPosts = posts.map(post => post.get({ plain: true }));

      console.log("hola mundo", plainPosts);
      return plainPosts;

   } catch (error) {
      console.error('Error al obtener posts:', error);
      throw error; // Relanzar el error para que se maneje en el handler
   }
}


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
      const posts = await Publicacion.findAll({
         where: { oculto: false, user_id },
         include: [
            {
                model : Usuario,
                as : 'usuarioQuienPublico',
                attributes : ['nombre', 'imagenURL']
            },
            {
               model: Comentario,
               include: [
                  {
                     model: Usuario,
                     as: 'usuarioComentario', // Usamos el alias definido en la asociación
                  }
               ]
            },
            {
               model: Emoticon,
               include: [
                  {
                     model: Usuario,
                     as: 'usuarioEmoticon', // Usamos el alias definido en la asociación
                  }
               ]
            }
         ]
      });

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

      if (!post) {
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
   updatePostController,
   getPostController1 // esto es prueba
};