import  {DataTypes }  from "sequelize";

export default (sequelize) => {
       sequelize.define("Comentario", {
         idComentario : {
           type : DataTypes.UUID,
           defaultValue : DataTypes.UUIDV4,
           allowNull :false,
           primaryKey :true,
         }, 
         idPublicacion : {
            type : DataTypes.UUID, // forane Key de una publicacion 
         }, 
         idUser : { 
            type : DataTypes.UUID,
         },
         date : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW,
         },
         comentary : {
            type : DataTypes.TEXT,
         }
       })
}