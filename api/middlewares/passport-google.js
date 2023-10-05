const passportSetup = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config();
const {Usuario} = require('../DB.js');
//require('dotenv').config();

/*GOOGLE_ID_CLIENT = 8766145957-9cot4r3pplvpn7r8tjmqkeq09ok65suc.apps.googleusercontent.com
GOOGLE_SECRET_CLIENT = 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
URI1 = "http://localhost:3007/auth/google"
URI2 = "http://localhost:3007/loginGoogle"*/ 
passportSetup.use(
   new GoogleStrategy({
      clientID: process.env.GOOGLE_ID_CLIENT,
      clientSecret : process.env.GOOGLE_SECRET_CLIENT,
      callbackURL : process.env.URI1,
   },


     async(accessToken, refreshToken, profile, done) => {
       // aqui busco o creo un nuevo usuario en mi base de datos MySQL
       const [user,created] = await Usuario.findOrCreate({
         where: {
           id: profile.id 
         },
         defaults: {
           nombre : profile.displayName,
           email: profile.emails[0].value,
           imagenURL : profile.photos[0].value
         }
       });
         return done(null,user);

     }
   )
);

// serializamos y deserializamos 

//se utiliza para determinar que datos del objeto de usuario deben almacenarse en la sesion
passportSetup.serializeUser((user,done) => {
   done(null,user.profile.id);
});
//se utiliza pra tomar  los datos de la sesion  y buscar informacion completa del usuarion en la base de datos
passportSetup.deserializeUser(async (id, done) => {
   let user;
   
   try {
     user = await Usuario.findByPk(id);  
   } catch (err) {
     done(err);
   }
 
   if (!user) {
     done(null, false);
   } else {  
     done(null, user);
   }
 });
module.exports = passportSetup;