const {Router} = require('express');
const {User} = require('../DB.js');
const rutaPrincipal = Router();


rutaPrincipal.post("/createUser", async(req,res) => {
  const {nombre,email,password} = req.body;
  if(nombre && email && password){
      const user = await User.create({nombre, email, password})
      console.log("Usuario creado con éxito");
      return res.status(200).json(user)
  }
  console.log("Error al crear el usuario");
  return res.status(400).json({ Error: error.message })
})


module.exports = rutaPrincipal;