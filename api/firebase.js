const admin = require('firebase-admin');
const serviceAccount = require('./firebase-conexia.json');
// ya no seria necesario esto  es el SDK de firebase Admin  para obtener el bucket
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.MY_BUCKET_URL
});

const bucket = admin.storage().bucket();

module.exports = bucket;