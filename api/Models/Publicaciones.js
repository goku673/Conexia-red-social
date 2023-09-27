import DataTypes  from "sequelize";


export default (sequelize) => {
   sequelize.define("Publicacion", {
     idPublicacion: {
       type: DataTypes.UUID,
       primaryKey: true,
       defaultValue: DataTypes.UUIDV4,
       allowNull: false,
     },
     review: {
       type: DataTypes.TEXT,
     },
     imagenURL: {
       type: DataTypes.STRING, // Almacenar la URL de la imagen en lugar de datos binarios
     },
     fecha: {
       type: DataTypes.DATE,
       defaultValue: DataTypes.NOW,
     },
   });
 };