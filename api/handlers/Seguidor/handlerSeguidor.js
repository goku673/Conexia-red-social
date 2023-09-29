const { followUserController } = require('../../controllers/Seguidor/controllerSeguidor');

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

module.exports = {followUser};
