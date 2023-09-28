const express = require('express');
const { createConnection } = require('mysql2');
const dotenv = require('dotenv');
const {conn}  = require('./DB.js');
dotenv.config();
const servidor = require('./servidor.js');

//const servidor = express();
//servidor.use(express.json());
const port = 3007;


//---------------------Servidor iniciando.
conn.sync({ force:false}).then(() => {
  servidor.listen(port, async() => {
    console.log('Servidor iniciado en el puerto ' + port);   
  });
});


