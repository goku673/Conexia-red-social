const { userRegisterController } = require('../../controllers/Usuario/controllerUsuario');

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

module.exports = {
  userRegister,
};
