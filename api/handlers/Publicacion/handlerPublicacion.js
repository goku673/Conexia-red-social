const {createPostController, 
    getAllPostsController, 
    getAllPostsByUserController,
    getPostByIdController} = require('../../controllers/Publicacion/controllerPublicacion')

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

const getAllPosts = async (req, res) => {
    try {
        const posts = await getAllPostsController();

        if (posts.error) {
            return res.status(400).json({ error: posts.error });
          }

          res.status(200).json(posts)
    } catch (error) {
        console.error('Error en el handler de getAllPosts:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


const getPostById = async (req, res) => {
    try {
        const post = await getPostByIdController(req);
        
        if (post.error) {
            return res.status(404).json({ error: post.error });
          }
          
          res.status(200).json(post)
    } catch (error) {
        console.error('Error en el handler de getPostById:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}


const getAllPostsByUser = async (req, res) => {
    try {
        const posts = await getAllPostsByUserController(req);
        
        if (posts.error || posts.length === 0) {
            return res.status(404).json({ error: posts.error });
          }
          
          res.status(200).json(posts)
          
    } catch (error) {
        console.error('Error en el handler de getAllPostsByUser:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
}};


module.exports = {
    createPost,
    getAllPosts,
    getAllPostsByUser,
    getPostById
};