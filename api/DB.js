import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
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


//  asociaciones  || modelo entidad relacion

// Asociaciones entre el Usuario y la Publicacion
   Usuario.hasMany(Publicacion, {
     foreignKey: "user_id", // La clave foránea en Publicacion que referencia a Usuario
   });
   Publicacion.belongsTo(Usuario, {
     foreignKey: "user_id", // La clave foránea en Publicacion que referencia a Usuario
   });
   
   
   // Asociaciones entre el Comentario y la Publicacion y su Usuario
   Usuario.hasMany(Comentario, {
     foreignKey: 'idUser', // La clave foránea en Usuario que referencia a Comentario
   })
   Comentario.belongsTo(Usuario, {
     foreignKey: 'idUser', // La clave foránea en Comentario que referencia a Usuario
   });
   Comentario.belongsTo(Publicacion, {
     foreignKey: 'idPublicacion', // La clave foránea en Comentario que referencia a Publicacion
   });

   Publicacion.hasMany(Comentario, {
     foreignKey: 'idPublicacion', // La clave foránea en Publicacion que referencia a Comentario
   });


    // Define la asociación para el emisor (usuario que envía el mensaje)
  Mensaje.belongsTo(Usuario, {
     as: "emisor",
     foreignKey: "user_id_emisor", // Clave foránea que referencia al emisor
   });
   // Define la asociación para el receptor (usuario que recibe el mensaje)
   Mensaje.belongsTo(Usuario, {
     as: "receptor",
     foreignKey: "user_id_receptor", // Clave foránea que referencia al receptor     
   });


   // Asociaciones entre Usuarios seguidos y seguidores
  Seguidor.belongsTo(Usuario, {
     as: "seguidor",
     foreignKey: "user_id_seguidor", // Clave foránea que referencia al seguidor
  })
  Seguidor.belongsTo(Usuario, {
     as: "seguido",
     foreignKey: "user_id_seguido", // Clave foránea que referencia al seguido
  }); 


  // Asociones entre Emoticones y Publicaciones y su Usuario
  Emoticon.belongsTo(Usuario, {
     foreignKey: 'idUser', // La clave foránea en Emoticon que referencia a Usuario
  })
  Emoticon.belongsTo(Publicacion, {
     foreignKey: 'idPublicacion', // La clave foránea en Emoticon que referencia a Publicacion
  });
