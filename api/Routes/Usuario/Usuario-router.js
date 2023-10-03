const { Router } = require("express");
const { userRegister, getAllUsers, getUserById } = require("../../handlers/Usuario/handlerUsuario")

const router = Router();

router.post("/register", userRegister);
router.get("/all", getAllUsers);
router.get("/userId/:id", getUserById);

module.exports = router;