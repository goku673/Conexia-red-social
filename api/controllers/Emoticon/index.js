const { Emoticon, Usuario, Publicacion } = require('../../DB.js');

const createEmotionController = async (req) => {

        try {
                const { idUser, idPublicacion} = req.body;

                //verifica que el usuario y la publicación existan 
                const user = await Usuario.findByPk(idUser);
                const publication = await Publicacion.findByPk(idPublicacion);

                if (!user || !publication) {
                        return { error: 'Usuario o publicación no encontrados' };
                }


                // verifica  si ya existe un emoticon para el usuario y la publicacion
                const existingEmoticon = await Emoticon.findOne({ where: { idUser, idPublicacion } });

                if (existingEmoticon) { 
                        // si  existe eliminamos es como un dislike
                        await existingEmoticon.destroy();
                        return { message: 'Dislike' };
                } else {

                        // Crear un nuevo emoticón asociado al usuario y la publicación
                        const newEmoticon = await Emoticon.create({ idUser, idPublicacion, typeEmoticon : 'corazon' });
                        return newEmoticon;

                }


        } catch (error) {
                console.error("Error al darle me gusta a un post", error);
        }
}


const deleteEmoticonController =  async(req) =>{
         const {idEmoticon} = req.params;
         if(idEmoticon){
            const existeEmoticon =await  Emoticon.findOne({where : {idEmoticon}});
            if (existeEmoticon){
                await existeEmoticon.destroy();
                return {message : 'emiticon eliminado',existeEmoticon}
            }else {
              return {error : 'no existe ese emoticon'}
            }
         
         }else {
             return { error : 'no existe Id'}
         }
}


module.exports = {
        
        createEmotionController,
        deleteEmoticonController
}