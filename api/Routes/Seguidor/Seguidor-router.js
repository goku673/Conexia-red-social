const { Router } = require("express");
const { followUser, getFollowingsByUser,getFollowersByUser } = require('../../handlers/Seguidor/handlerSeguidor')

const router = Router();

router.post('/followUser', followUser);
router.get('/getFollowingsByUser/:user_id', getFollowingsByUser);
router.get('/getFollowersByUser/:user_id', getFollowersByUser);

module.exports = router;