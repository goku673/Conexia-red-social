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

const dominioPermitido = 'http://localhost:5173';
const opcionesCors = {
  origin: dominioPermitido,
  credentials: true,
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
servidor.use(cors(opcionesCors));

// configuacion de middelwares
servidor.use(express.urlencoded({ extended: true, limit: '200mb' }));//recibir datos de formularios html
servidor.use(express.json({ limit: '200mb' }));//permite recibir datos json 
servidor.use(cookieParser());//permite mandar info por cookies;
servidor.use(morgan('dev'));// registro de solicitudes alas rutas;

servidor.use(session({
  secret: process.env.mySuperSecretKey,
  resave: false,
  saveUninitialized: true,
}));

servidor.use(passportSetup.initialize());
servidor.use(passportSetup.session());

servidor.use((req, res, next) => {
  console.log('Origin:', req.get('origin'));
  next();
});

servidor.use('/', rutaPrincipal);

module.exports = {servidor};