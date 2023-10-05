const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("Usuario", {
    id: {
      type: DataTypes.UUID,
      defaultValue:  DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validar que el campo sea una dirección de correo electrónico
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imagenURL: {
      type: DataTypes.STRING, // Almacenar la URL de la imagen en lugar de datos binarios
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isSuperAdmin :{
        type : DataTypes.BOOLEAN,
        defaultValue : false,
    }
  });
};
