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
const upload = require('../../services/multer.js');


router.post("/register",upload.single('imagen'), userRegister); // para manejar la subida de archivos
router.post("/login", logIn);
router.get("/all", getAllUsers);
router.get("/userId/:id", getUserById);
router.delete("/deleteUser/:id", DeleteUserById);
router.get("/userName", getUserByName);
router.put("/updateUser/:id", updateUser);
router.put("/updatePassword/:id", updatePassword);


module.exports = router;