const { Seguidor } = require('../../DB.js');

const followUserController = async (req) => {
    try {
        const { user_id_seguidor, user_id_seguido } = req.body;

        // Verificar si ya existe una relación de seguimiento entre estos usuarios
        const existingFollow = await Seguidor.findOne({
            where: { user_id_seguidor, user_id_seguido }
        });

        if (existingFollow) {
            return { error: 'Ya sigues a este usuario' };
        }

       
        const newFollower = await Seguidor.create({
            user_id_seguidor,
            user_id_seguido
        });

        return newFollower;
    } catch (error) {
        console.error('Error al seguir a un usuario:', error);
        throw error; 
    }
}

const getFollowingsByUserController = async (req) => {
    try {
        const { user_id } = req.params;
        const followings = await Seguidor.findAll({
            where: { user_id_seguidor: user_id }
        });

        if (followings.length === 0) {
            return { error: 'No sigues a ningún usuario' };
        }


        return followings;
        
    } catch (error) {
        console.error('Error al obtener los seguidores de un usuario:', error);
        throw error; 
}};

const getFollowersByUserController = async (req) => {
    try {
        const { user_id } = req.params;
        const followers = await Seguidor.findAll({
            where: { user_id_seguido: user_id }
        });
        
        if (followers.length === 0) {
            return { error: 'Ningún usuario te sigue' };
        }
        
        return followers;
        
    } catch (error) {
        console.error('Error al obtener los seguidores de un usuario:', error);
        throw error; 
    }
};


const unFollowUserController = async (req) => {
    try {
        const { user_id_seguidor, user_id_seguido } = req.body;

        // Verificar si existe una relación de seguimiento entre estos usuarios
        const existingFollow = await Seguidor.findOne({
            where: { user_id_seguidor, user_id_seguido }
        });

        if (!existingFollow) {
            return { error: 'No sigues a este usuario' };
        }

        // Eliminar la relación de seguimiento
        await existingFollow.destroy();

        return { message: 'Has dejado de seguir a este usuario' };
    } catch (error) {
        console.error('Error al dejar de seguir a un usuario:', error);
        throw error;
    }
};

module.exports = {
    followUserController,
    getFollowingsByUserController,
    getFollowersByUserController,
    unFollowUserController
};
