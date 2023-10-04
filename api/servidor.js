const rutaPrincipal = require('./Routes/index.js');
const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const passportSetup = require('./middlewares/passport-google.js');
const dotenv   = require('dotenv');
const session = require('express-session');

dotenv.config();
const servidor = express();
// configuacion de middelwares
servidor.use(express.urlencoded({ extended: true, limit: '200mb' }));//recibir datos de formularios html
servidor.use(express.json({ limit: '200mb' }));//permite recibir datos json 
servidor.use(cookieParser());//permite mandar info por cookies;
servidor.use(morgan('dev'));// registro de solicitudes alas rutas;
// cuando instalesmo passport  hacemos servidor.use(passport.initialize());
servidor.use(session({
  secret: process.env.mySuperSecretKey,
  resave: false,
  saveUninitialized: true,
}));

servidor.use(passportSetup.initialize());
servidor.use(passportSetup.session());
const dominioPermitido = '*';
// forma antigua;
// servidor.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
//   });
//forma mas moderna
const opcionesCors = {
  origin: dominioPermitido,
  credentials: true,   // solicitudes con credenciales por emjemplo cookies desde el dominio permitido 
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
servidor.use(cors(opcionesCors));
servidor.use('/', rutaPrincipal);




module.exports = servidor;