const { Router } = require("express");
const { userRegister, getAllUsers, getUserById, logIn, DeleteUserByEmail } = require("../../handlers/Usuario/handlerUsuario")

const router = Router();

router.post("/register", userRegister);
router.post("/login", logIn);
router.get("/all", getAllUsers);
router.get("/userId/:id", getUserById);
router.delete("/deleteUser/:id", DeleteUserByEmail);

module.exports = router;