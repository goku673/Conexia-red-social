const { Router } = require("express");
const { followUser, getFollowingsByUser,getFollowersByUser, unFollowUser } = require('../../handlers/Seguidor/handlerSeguidor')

const router = Router();

router.post('/followUser', followUser);
router.get('/getFollowingsByUser/:user_id', getFollowingsByUser);
router.get('/getFollowersByUser/:user_id', getFollowersByUser);
router.delete('/unFollowUser', unFollowUser);

module.exports = router;