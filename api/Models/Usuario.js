const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize) => {
  const Usuario = sequelize.define("Usuario", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    googleId : {
        type: DataTypes.STRING,
        allowNUll: true,
        unique:true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true, // Validar que el campo sea una dirección de correo electrónico
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue('password', hash);
      }
    },
    imagenURL: {
      type: DataTypes.STRING, // Almacenar la URL de la imagen en lugar de datos binarios
    },
    fechaRegistro: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    isSuperAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    resenia : {
       type : DataTypes.STRING,
    },
    imagenURLPortada : {
       type : DataTypes.STRING,
    }
  });

  // Definir el método de instancia checkPassword
  Usuario.prototype.checkPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return Usuario;
};
