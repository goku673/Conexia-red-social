import express from 'express';
import { Connection, createConnection } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();




const app = express();
app.use(express.json());
const port =  3007;




const connection= createConnection({
  host: process.env.HOST,
  port:process.env.PORT, // Convierte process.env.PORT a número
  user: process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATABASE,
});



connection.connect((error) => {
  if (error) {
    console.error('Error al conectar a la base de datos: ', error);
  } else {
    console.log('Conexión exitosa a MySQL :)');




    //---------------------Servidor iniando.
    app.listen(port, () => {
      console.log('Servidor iniciado en el puerto '+port);
    });
  }
});



