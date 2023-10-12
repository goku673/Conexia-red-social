const { app } = require('./fireBase.config');
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");

const storage = getStorage(app);

const firebaseUploader = async (file) => {
  try {
    const { originalname, buffer, mimetype } = file;
    const storageRef = ref(
      storage,
      `gs://${process.env.storageBucket}/${originalname}`
    );

    const metadata = {
      contentType: mimetype,
    };

    const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("File uploaded to:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

module.exports = firebaseUploader;
