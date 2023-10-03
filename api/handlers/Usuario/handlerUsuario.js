const { userRegisterController, getAllUsersController, getUserByIdController } = require('../../controllers/Usuario/controllerUsuario');

const userRegister = async (req, res) => {
  try {
    const newUser = await userRegisterController(req);

    if (newUser.error) {
      return res.status(400).json({ error: newUser.error });
    }
    
    return res.status(201).json(newUser);
  } catch (error) {
    console.error('Error en el handler de registro de usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersController();

    if(users.error) {
      return res.status(400).json({ error: users.error });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.error('Error en el handler de obtener todos los usuarios:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdController(req);

    if(user.error) {
      return res.status(404).json({ error: user.error });
    }

    return res.status(200).json(user);
    
  } catch (error) {
    console.error('Error en el handler de obtener un usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  userRegister,
  getAllUsers,
  getUserById
};
