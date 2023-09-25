import express from 'express';
import { Connection, createConnection } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();




const app = express();
app.use(express.json());
const port: number = 3006;




const connection: Connection = createConnection({
  host: String(process.env.HOST),
  port: Number(process.env.PORT), // Convierte process.env.PORT a número
  user: String(process.env.USER),
  password: String(process.env.PASSWORD),
  database: String(process.env.DATABASE),
});


connection.connect((error: Error | null) => {
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


