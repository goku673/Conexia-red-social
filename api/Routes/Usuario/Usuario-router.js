const { Router } = require("express");
const { userRegister, getAllUsers } = require("../../handlers/Usuario/handlerUsuario")

const router = Router();

router.post("/", userRegister);
router.get("/", getAllUsers);

module.exports = router;