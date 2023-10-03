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

module.exports = createPostController;