const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
       sequelize.define("Comentario", {
         idComentario : {
           type : DataTypes.UUID,
           defaultValue : DataTypes.UUIDV4,
           allowNull :false,
           primaryKey :true,
         }, 
         date : {
            type : DataTypes.DATE,
            defaultValue : DataTypes.NOW,
         },
         comentario : {
            type : DataTypes.TEXT,
         },
       })
}


