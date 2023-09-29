const { Usuario } = require('../../DB.js');

const userRegisterController = async ( req ) => {
  try {
    const { nombre, email, password, imagenURL } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
        return { error: 'El email ya está registrado' };
    }

    // Crear un nuevo usuario en la base de datos
    const newUser = await Usuario.create({ nombre, email, password, imagenURL });

    return newUser
  } catch (error) {
    console.error('Error al registrar usuario:', error);
  }
};

module.exports = {
    userRegisterController,
};
