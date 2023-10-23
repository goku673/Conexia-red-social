const sgMail = require('@sendgrid/mail');
const dontenv = require('dotenv');
dontenv.config();
sgMail.setApiKey(process.env.CONEXIA_API_KEY);

const logGoogle = async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            //configuramos el objeto para enviar el correo 
            const msg = {
                to: user.email, // sacamos el email de usuario, 
                from: process.env.MY_EMAIL,
                subject: `BIENBENIDO ${user.nombre} A NUESTRA APLICACION`,
                text: 'Estamos contentos de que te hayas unido a nuestra aplicación. ¡Disfrutala!',
                html: `
            <div>
                 <h1>BIENBENIDO ${user.nombre} a nuestra red social </h1>
                 <br>
                 <p>Estamos  contentos de que te hayas unido a nuestra plataforma, Disfrutala </p>
                 <p>Espero que  te diviertas! </p>
            </div>
         `
            }; // con esto ya configuramos nuestro objeto de correo,

            //enviamos el email
            sgMail.send(msg).then(() => {
                console.log("Correo de bienbenida enviada con exito");
            }).catch((error) => {
                console.log('Error al enviar el correo', error.response.body);
            });
             // convertimos el objeto a json  
             res.cookie('user', JSON.stringify(user),{ maxAge: 7 * 24 * 60 * 60 * 1000 });

            res.redirect(`http://localhost:5173`);
        } else {
            return res.status(401).json({ message: 'autenticacion con google fallida' });
        }

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }
}

module.exports = logGoogle;