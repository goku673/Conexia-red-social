const createPostController = require('../../controllers/Publicacion/controllerPublicacion')

const createPost = async (req, res) => {
    try {
        const post = await createPostController(req);

        if (post.error) {
            return res.status(400).json({ error: post.error });
          }

        res.status(200).json(post)
    } catch (error) {
        console.error('Error en el handler de creación de post:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

module.exports = createPost;