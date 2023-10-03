const {Mensaje} = require('../../DB');
const createMessageController= async(text,user_id_emisor,user_id_receptor) => {

      const mensaje  = await  Mensaje.create({
               text,
               user_id_emisor,
               user_id_receptor
      })
      return mensaje;

}

module.exports = createMessageController;