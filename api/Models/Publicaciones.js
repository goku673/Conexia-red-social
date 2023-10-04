const { DataTypes } = require('sequelize');

// sequelize por defecto pluraliza el nombre de las tablas y si no queremos que lo pluralize uzamos 
//freezeTableName : true;
module.exports = (sequelize) => {
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
      type: DataTypes.STRING,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    oculto: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Por defecto, la publicación no está oculta
    }
  });
};