const { Router } = require("express");
const { followUser } = require('../../handlers/Seguidor/handlerSeguidor')

const router = Router();

router.post('/', followUser);

module.exports = router;