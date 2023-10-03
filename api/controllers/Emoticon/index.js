const  {Emoticon,Usuario, Publicacion} = require('../../DB.js');

const createEmotionController = async(req) => {

       try {
        const { idUser, idPublicacion, typeEmoticon } = req.body;

        //verifica que el usuario y la publicación existan 
        const user = await Usuario.findByPk(idUser);
        const publication = await Publicacion.findByPk(idPublicacion);

        if (!user || !publication) {
                return { error: 'Usuario o publicación no encontrados' };
        }
          
        // Crear un nuevo emoticón asociado al usuario y la publicación
        const newEmoticon = await Emoticon.create({ idUser, idPublicacion, typeEmoticon });
        return newEmoticon;

       } catch (error) {
          console.error("Error al darle me gusta a un post", error);
       }
}

module.exports = createEmotionController;


