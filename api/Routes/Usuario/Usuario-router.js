const { Router } = require("express");
const { userRegister, 
    getAllUsers, 
    getUserById, 
    logIn, 
    DeleteUserById, 
    getUserByName, 
    updateUser,
    updatePassword
} = require("../../handlers/Usuario/handlerUsuario")

const router = Router();
const multerUpload= require('../../services/multer.js');


router.post("/register",multerUpload.single('imagen'), userRegister); // para manejar la subida de archivos
router.post("/login", logIn);
router.get("/all", getAllUsers);
router.get("/userId/:id", getUserById);
router.delete("/deleteUser/:id", DeleteUserById);
router.get("/userName", getUserByName);
router.put("/updateUser/:id",multerUpload.fields([{ name: 'imagenPerfil' }, { name: 'imagenPortada' }]), updateUser);// para manejar la subida de archivos de para la actualizacion
router.put("/updatePassword/:id", updatePassword);


module.exports = router;

