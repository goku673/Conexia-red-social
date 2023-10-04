const { followUserController, getFollowingsByUserController, getFollowersByUserController } = require('../../controllers/Seguidor/controllerSeguidor');

const followUser = async (req, res) => {
    try {
        const newFollower = await followUserController(req);

        if (newFollower.error) {
            return res.status(400).json({ error: newFollower.error });
        }

        return res.status(200).json(newFollower);
    } catch (error) {
        console.error('Error en el handler de followUser:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}


const getFollowingsByUser = async (req, res) => {
    try {
        const followings = await getFollowingsByUserController(req);
        if (followings.error) {
            return res.status(400).json({ error: followings.error });
        }
        return res.status(200).json(followings);
        
    } catch (error) {
        console.error('Error en el handler de getFollowingsByUser:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });  
    }
};


const getFollowersByUser = async (req, res) => {
    try {
        const followers = await getFollowersByUserController(req);
        if (followers.error) {
            return res.status(400).json({ error: followers.error });
        }
        return res.status(200).json(followers);
    } catch (error) {
        console.error('Error en el handler de getFollowersByUser:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};

module.exports = {followUser, getFollowingsByUser,getFollowersByUser};
