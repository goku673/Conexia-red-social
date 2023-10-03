const createMessageController = require('../../controllers/Mensaje/index.js')

const createMessage = async (req ,res) =>{
   try {
      const {text,user_id_emisor,user_id_receptor} = req.body;
      if(text && user_id_emisor && user_id_receptor){
          const mensajeCreado = await createMessageController(text,user_id_emisor,user_id_receptor);
          res.status(200).json(mensajeCreado);
      }
   } catch (error) {
    return { error : error};
   }
}

module.exports = createMessage;