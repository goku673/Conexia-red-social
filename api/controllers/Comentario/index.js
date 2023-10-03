const {Comentario ,Usuario,Publicacion} = require('../../DB.js');

const createComentController = async (comentario,idUser,idPublicacion) => {
   
     //verifica que el usuario y la publicación existan 
     const user = await Usuario.findByPk(idUser);
     const publication = await Publicacion.findByPk(idPublicacion);

     if (!user || !publication) {
             return { error: 'Usuario o publicación no encontrados' };
     }
      
  
    const createComentario = await Comentario.create({
      comentario,
      idUser,
      idPublicacion
    })
    return createComentario;
  //  if(!comentario) {
  //    throw new Error("errror");
  //  }else{ 
  //    return comentario;
  //  }
}


module.exports = createComentController;