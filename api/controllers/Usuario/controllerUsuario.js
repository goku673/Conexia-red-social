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


const logInController = async ( req ) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return { error: 'Credenciales incorrectas' };
    }
    const isPasswordCorrect = await Usuario.findOne({ where: { password } });
    if (!isPasswordCorrect) {
      return { error: 'Contraseña incorrecta' };
    }
    return user;
    
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Error interno al iniciar sesión'); // Relanzar el error para que se maneje en el handler
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


  const DeleteUserByEmailController = async ( req ) => {
    try {
      const { id } = req.params;
      const user = await Usuario.findOne({ where: { id } });
      if (!user) {
        return { error: 'El usuario no existe' };
      }
      await Usuario.destroy({ where: { id } });
      return user;
      
    } catch (error) {
      console.error('Error al borrar usuario:', error);
      throw error; // Relanzar el error para que se maneje en el handler
    }
  };


module.exports = {
    userRegisterController,
    getAllUsersController,
    getUserByIdController,
    logInController,
    DeleteUserByEmailController
};
