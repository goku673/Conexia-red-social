const {
    createEmotionController,
    deleteEmoticonController
}= require ('../../controllers/Emoticon/index.js');

const createEmoticon  = async(req,res) => {
    
    try {
        const mensaje = await createEmotionController(req);

        if(mensaje.error){
            return res.status(400).send({error: mensaje.error});
        }

        return res.status(200).json(mensaje);
        
    } catch (error) {
        res.status(400).json({error :error});
    }
    
}

const deteteEmoticon  = async(req,res) => {
     try {
        const emoticonEliminado  =await deleteEmoticonController(req);
        if(emoticonEliminado.error){
          return res.status(400).json({error : emoticonEliminado.error});
        }
        res.status(200).json(emoticonEliminado);
        
     } catch (error) {
        
         res.status(400).json({error : error});
     }

}
 
module.exports ={
    createEmoticon, 
    deteteEmoticon,
}
