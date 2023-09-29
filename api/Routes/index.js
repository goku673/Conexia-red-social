const {Router} = require('express');
const {Usuario} = require('../DB');
const {Publicacion} = require('../DB')
const rutaPrincipal = Router();


// // rutaPrincipal.post("/createUser", async(req,res) => {
// //   const {nombre,email,password} = req.body;
// //   if(nombre && email && password){
// //       const user = await Usuario.create({nombre, email, password});
// //       console.log("Usuario creado con éxito");
// //       return res.status(200).json(user)
// //   }
// //   console.log("Error al crear el usuario");
// //   return res.status(400).json({ Error: error.message })
// // })

// // rutaPrincipal.post("/createPublicacion", async(req, res) => {
    
// //    /*  review: {
// //       type: DataTypes.TEXT,
// //     },
// //     imagenURL: {
// //       type: DataTypes.STRING,
// //     }, */

// //     const  { review,imagenURL,user_id} = req.body;
// //     if(review && imagenURL){
// //        const  publicacion = await Publicacion.create({review,imagenURL,user_id});
// //        return res.status(200).json(publicacion);
// //     }
// //     return res.status(400).send("hubo un error al crear la publicacion");
// // })

module.exports = rutaPrincipal;