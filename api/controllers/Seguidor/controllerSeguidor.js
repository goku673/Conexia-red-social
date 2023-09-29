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

module.exports = {
    followUserController
};
