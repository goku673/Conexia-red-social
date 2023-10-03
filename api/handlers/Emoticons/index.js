const createEmotionController = require ('../../controllers/Emoticon/index.js');

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

module.exports = createEmoticon ;