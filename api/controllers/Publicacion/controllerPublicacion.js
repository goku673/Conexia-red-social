const { Publicacion } = require('../../DB')

const createPostController = async (req) => {
 try {
    const { review, imagenURL, user_id} = req.body

    const post = await Publicacion.create({
        review,
        imagenURL,
        user_id
    })  
    return post
 } catch (error) {
    console.error('Error al crear una publicación:', error);
 }
}

module.exports = createPostController