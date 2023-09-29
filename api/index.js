
const dotenv = require('dotenv');
const {conn}  = require('./DB.js');
dotenv.config();
const servidor = require('./servidor.js');

//const servidor = express();
//servidor.use(express.json());
const port = 3007;


//---------------------Servidor iniciando.  sync sincronizado la base de datos sequelize y sevidor;
conn.sync({ force:false}).then(() => {
  servidor.listen(port, async() => {
    console.log('Servidor iniciado en el puerto ' + port);   
  });
});

//carga de imgagenes multer / firebase/
// login de google passport / out2.0
