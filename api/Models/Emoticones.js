import  {DataTypes ,} from  "sequelize";


export default (createModel) => {
         createModel.define ("Emoticon", {
              idEmoticon: {
                type : DataTypes.UUID,
                primaryKey: true, 
                allowNull : false, 
                defaultValue : DataTypes.UUIDV4,
              },
              idUsuario : {
                type : DataTypes.UUID   // la forane Key Id del Usuario; 
              },
              idPUblicacion : {         // forane key del Id de la Publicación;
                 type : DataTypes.UUID,
              },
              typeEmoticon : {
                type : DataTypes.ENUM("corazon"),
              }
              
         })
} 
