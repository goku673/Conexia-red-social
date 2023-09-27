import { Sequelize ,DataTypes} from "sequelize";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import modeloComentario from "./Models/Comentarios.js";
import modeloEmoticones from "./Models/Emoticones.js";
import modeloMensaje from "./Models/Mensaje.js";
import modeloPublicacion from "./Models/Publicaciones.js";
import modeloSeguidor from "./Models/Seguidores.js";
import modeloUsuario  from "./Models/Usuario.js"


const { HOST, PORT, USER, PASSWORD, DATABASE } = process.env;

// parametros para conectar con la base de datos;
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: "mysql",
     port: PORT,
  });

try {
       await sequelize.authenticate();
       console.log('Connected to MySQL');
  } catch (error) {
       console.log('No connected', "-->", error);
}
// insertamos sequelize a nuestros modelos; 
const Comentario = modeloComentario(sequelize);
const Emoticon = modeloEmoticones(sequelize);
const Mensaje  =  modeloMensaje(sequelize);
const Publicacion= modeloPublicacion(sequelize);
const Seguidor = modeloSeguidor(sequelize);
const Usuario = modeloUsuario(sequelize);


//  asociaones || modelo entidad relacion
Usuario.hasMany(Publicacion,{  // un usuario tiene muchas publicaciones
     foreignKey :"idUsuarioPublicacion"
});
Publicacion.belongTo(Usuario,{ //una publicacion le pertenece a un solo usuario;
     foreignKey :"idUsuarioPublicacion"
})


Usuario.hasMany(Comentario,{// un usuario tiene muchos comentarios
    foreignKey :"idPublicacion"
})
Comentario.belongsTo(Usuario,{
   foreignKey : "idPublicacion"
});


