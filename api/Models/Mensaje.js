import { DataTypes} from "sequelize";


export default  (sequelize) => {
      sequelize.define("Mensaje", {
          idMessage : { 
             type : DataTypes.UUID,
             primaryKey : true,
             allowNull :false, 
             defaultValue : DataTypes.UUIDV4,
            },
            idTransmitter : {
                 type :  DataTypes.UUID,  // foraneKey del User del quien va a enviar el mensaje;
            },
            idReceiver : { 
                type : DataTypes.UUID,  // fornekey del  usuario a que se va recibir el mensaje
            }, 
            text : { 
                type : DataTypes.TEXT,
                allowNull: false,
            }
        
      })
}