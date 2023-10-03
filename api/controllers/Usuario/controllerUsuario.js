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


const getAllUsersController = async () => {
  try {
    const users = await Usuario.findAll();

    if (!users) {
      return { error: 'No se han encontrado usuarios' };
    }

    return users;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error; // Relanzar el error para que se maneje en el handler
  }
};


const getUserByIdController = async ( req ) => {
  try {
    const { id } = req.params;
    const user = await Usuario.findByPk(id);
    if (!user) {
      return { error: 'El usuario no existe' };
    }
    return user;
    
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    throw error; // Relanzar el error para que se maneje en el handler
  }
};

module.exports = {
    userRegisterController,
    getAllUsersController,
    getUserByIdController
};
