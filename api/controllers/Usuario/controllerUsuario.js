const { Usuario } = require('../../DB.js');
const { Op } = require('sequelize');
//const bucket =require('../../firebase.js');
const dotenv = require('dotenv');
// configuracion   SDK de google  cloud para interactuar con firebase y obtener la referencia al bucket
const {Storage} = require('@google-cloud/storage');
dotenv.config();
const storage = new Storage({
  projectId: 'red-conexia',
  keyFilename: './firebase-conexia.json'
});

const bucket = storage.bucket(process.env.MY_BUCKET_URL);

const userRegisterController = async (req) => {
  try {
    const { nombre, email, password,} = req.body;
    const imagen = req.file;
    
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await Usuario.findOne({ where: { email } });
    if (existingUser) {
      return { error: 'El email ya está registrado' };
    }

    // Crear un nuevo usuario en la base de datos

    // subo la imagen a firebase
    let remoteFileName = imagen.filename;
    let file = bucket.file(remoteFileName);

    await bucket.upload(imagen.path, {
      destination: remoteFileName,
      public: true,
      metadata: { contentType: 'image/jpeg' },
    });

    const imagenURL = `https://firebasestorage.googleapis.com/v0/b/red-conexia.appspot.com/o/${encodeURIComponent(remoteFileName)}?alt=media`
    const newUser = await Usuario.create({ nombre, email , password, imagenURL });

    return newUser
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return {error : error.message};
  }
};


const logInController = async (req) => {
  try {
    const { email, password } = req.body;
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return { error: 'Credenciales incorrectas' };
    }
    // await Usuario.findOne({ where: { password } });
  
    const isPasswordCorrect = user.password === password;
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


const getUserByIdController = async (req) => {
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


const DeleteUserByIdController = async (req) => {
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


const getUserByNameController = async (req) => {
  try {
    const { nombre } = req.query;
    const users = await Usuario.findAll({
      where: {
        nombre: {
          [Op.like]: `%${nombre}%`
        }
      }
    });

    if (users.length === 0) {
      return { error: 'No se encontraron usuarios con ese nombre' };
    }

    return users;
  } catch (error) {
    console.error('Error al obtener usuarios por nombre:', error);
    throw error;
  }
};


const updateUserController = async (req) => {
  try {
    const { id } = req.params;
    const { nombre, imagenURL } = req.body;
    const user = await Usuario.findByPk(id);
    if (!user) {
      return { error: 'El usuario no existe' };
    }
    await user.update({ nombre, imagenURL });
    return user;

  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    throw error;
  }
};


const updatePasswordController = async (req) => {
  try {
    const { id } = req.params;
    const { currentPassword, newPassword } = req.body;
    const user = await Usuario.findByPk(id);

    if (!user) {
      return { error: 'El usuario no existe' };
    }

    // Verifica si la contraseña actual proporcionada coincide con la almacenada
    const isPasswordCorrect = await user.checkPassword(currentPassword);

    if (!isPasswordCorrect) {
      return { error: 'La contraseña actual es incorrecta' };
    }

    // Actualiza la contraseña del usuario con la nueva contraseña
    await user.update({ password: newPassword });

    return user;
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    throw error;
  }
};


module.exports = {
  userRegisterController,
  getAllUsersController,
  getUserByIdController,
  logInController,
  DeleteUserByIdController,
  getUserByNameController,
  updateUserController,
  updatePasswordController
};
