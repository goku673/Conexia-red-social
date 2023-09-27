import  {DataTypes}  from "sequelize";


export default (sequelize) => {
           sequelize.define("Publicacion",{
              idPublicacion : {
                 type : DataTypes.UUID,
                 primaryKey : true, 
                 defaultValue : DataTypes.UUIDV4,
                 allowNull : false,
                 }, 
            //   idUsuarioPublicacion : {   // la llave foranea de Usuario;
            //       type : DataTypes.UUID,
            //      },
              review : {
                 type : DataTypes.TEXT, 
                 }, 
              image: { 
                 type  : DataTypes.BLOB,
                 },
              fecha : {
                type : DataTypes.DATE, 
                defaultValue : DataTypes.NOW,
              },
             
           })

        
}