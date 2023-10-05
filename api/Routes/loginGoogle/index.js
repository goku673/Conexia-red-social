const { Router } = require("express")
const passport = require("passport");
const logGoogle = require('../../handlers/loginGoogle/index.js');
const rutaGoogle = Router();

// rutaGoogle.get('/',
//     passport.authenticate('google', {scope: ['profile','email']})
//  );

rutaGoogle.get('/',passport.authenticate('google',{failureRedirect : '/login'}),
  logGoogle
);

module.exports = rutaGoogle;