const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");

const { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } = process.env;


// se incializa firebase

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();


module.exports = { app, storage  };