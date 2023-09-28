const rutaPrincipal = require('./Routes/index.js');
const express = require('express');
const cookieParser = require('cookie-parser');
//const bodyParser = require('body-parser'); ya obsolteto
const morgan = require('morgan');
const cors = require('cors');

const servidor = express();
// configuacion de middelwares
servidor.use(express.urlencoded({ extended: true, limit: '200mb' }));//recibir datos de formularios html
servidor.use(express.json({ limit: '200mb' }));//permite recibir datos json 
servidor.use(cookieParser());//permite mandar info por cookies;
servidor.use(morgan('dev'));// registro de solicitudes alas rutas;
servidor.use(cors()); // permite todas las solicitudes de cualquier origen ; 
// cuando instalesmo passport  hacemos servidor.use(passport.initialize());

servidor.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });


servidor.use('/', rutaPrincipal);




module.exports = servidor;