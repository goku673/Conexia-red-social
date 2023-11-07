const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const fs = require('fs');
const path = require("path");

// modelos

const { HOST, PORT, USER, PASSWORD, DATABASE } = process.env;

// parametros para conectar con la base de datos;
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
  port: PORT,
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const { Comentario, Emoticon, Mensaje, Publicacion, Usuario, Seguidor } = sequelize.models;

//  asociaciones  || modelo entidad relacion

// Asociaciones entre el Usuario y la Publicacion
Usuario.hasMany(Publicacion, {
  foreignKey: "user_id", // La clave foránea en Publicacion que referencia a Usuario
});
Publicacion.belongsTo(Usuario, {
  as : 'usuarioQuienPublico',
  foreignKey: "user_id", // La clave foránea en Publicacion que referencia a Usuario
});


// Asociaciones entre el Comentario y la Publicacion y su Usuario
// Usuario.hasMany(Comentario, {
//   foreignKey: 'idUser', // La clave foránea en Usuario que referencia a Comentario
// })
Comentario.belongsTo(Usuario, {
  as : 'usuarioComentario',
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
  as : 'usuarioEmoticon',
  foreignKey: 'idUser', // La clave foránea en Emoticon que referencia a Usuario
})
Emoticon.belongsTo(Publicacion, {
  foreignKey: 'idPublicacion', // La clave foránea en Emoticon que referencia a Publicacion
});

Publicacion.hasMany(Emoticon,{
   foreignKey : 'idPublicacion', // la clave foranea en publicacion que hace referencia a Emoticon
})

sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL');
  })
  .catch((error) => {
    console.log('Not connected', "-->", error);
  });

module.exports = {
 conn : sequelize,
 Usuario: sequelize.models.Usuario, 
 Comentario: sequelize.models.Comentario,
 Emoticon: sequelize.models.Emoticon,
 Mensaje: sequelize.models.Mensaje,
 Publicacion: sequelize.models.Publicacion,
 Seguidor: sequelize.models.Seguidor,
};