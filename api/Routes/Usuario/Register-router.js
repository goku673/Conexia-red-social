const { Router } = require("express");
const { userRegister } = require("../../handlers/Usuario/handlerUsuario")

const router = Router();

router.post("/", userRegister);

module.exports = router;