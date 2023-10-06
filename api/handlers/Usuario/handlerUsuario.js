const { userRegisterController, 
  getAllUsersController, 
  getUserByIdController, 
  logInController, 
  DeleteUserByIdController,
  getUserByNameController,
  updateUserController,
  updatePasswordController
} = require('../../controllers/Usuario/controllerUsuario');
const enviarEmail  = require('@sendgrid/mail');
const dotenv       = require('dotenv');
dotenv.config();

enviarEmail.setApiKey(process.env.CONEXIA_API_KEY);
const userRegister = async (req, res) => {
  try {
    const newUser = await userRegisterController(req);

    if (newUser.error) {
      return res.status(400).json({ error: newUser.error });
    }

    const mensaje = {
       to : newUser.email,
       from : process.env.MY_EMAIL,
       subject : `BIENBENIDO ${newUser.nombre} a nuestra Aplicacion`,
       text : 'Estamos contentos de que te hayas unido a nuestra aplicación. ¡Disfrutala!',
       html : `
          <div>
               <h1>BIENBENIDO ${newUser.nombre} a nuestra red social </h1>
               <br>
               <p>Estamos  contentos de que te hayas unido a nuestra plataforma, Disfrutala </p>
               <p>Espero que  te diviertas! </p>
          </div>
       `
    }

    enviarEmail.send(mensaje).then( ()=> {
        console.log(`Correo enviado con exito a ${newUser.email}`);
    }).catch( (error) => {
        console.log('Error al enviar el correo', error)
    })
  
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


const logIn = async (req, res) => {
  try {
    const user = await logInController(req);
    
    if(user.error) {
      return res.status(400).json({ error: user.error });
    }
    
    return res.status(200).json({ message: 'Inicio de sesión exitoso', userID: user.id, 
    imagenURL: user.imagenURL, 
    nombre: user.nombre, 
    email: user.email 
  });

  } catch (error) {
    console.error('Error en el handler de signIn:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


const DeleteUserById = async (req, res) => {
  try {
    const user = await DeleteUserByIdController(req);
    
    if(user.error) {
      return res.status(400).json({ error: user.error });
    }
    
    return res.status(200).json({ message: 'Usuario eliminado' });
    
  } catch (error) {
    console.error('Error en el handler de borrar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


const getUserByName = async (req, res) => {
  try {
    const user = await getUserByNameController(req);
    
    if(user.error) {
      return res.status(400).json({ error: user.error });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error en el handler de buscar usuario por nombre:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


const updateUser = async (req, res) => {
  try {
    const user = await updateUserController(req);
    
    if(user.error) {
      return res.status(400).json({ error: user.error });
    }
    
    return res.status(200).json({ message: 'Usuario actualizado' });
    
  } catch (error) {
    console.error('Error en el handler de actualizar usuario:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};


const updatePassword = async (req, res) => {
  try {
    const user = await updatePasswordController(req);
    
    if(user.error) {
      return res.status(400).json({ error: user.error });
    }
    
    return res.status(200).json({ message: 'Contraseña actualizada' });
    
  } catch (error) {
    console.error('Error en el handler de actualizar contraseña:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

module.exports = {
  userRegister,
  getAllUsers,
  getUserById,
  logIn,
  DeleteUserById,
  getUserByName,
  updateUser,
  updatePassword
};
