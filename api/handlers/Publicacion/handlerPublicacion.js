const { post } = require('../../Routes');
const { createPostController,
    getAllPostsController,
    getAllPostsByUserController,
    getPostByIdController,
    hidePostController,
    showPostController,
    deletePostByIdController,
    getHiddenPostsByUserController,
    updatePostController,
    getPostController1
} = require('../../controllers/Publicacion/controllerPublicacion')

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

// solo para un ejemplo 
const getPost1 = async (req, res) => {

    try {
          const post  = await getPostController1();
          if(post.error){
             return res.status(401).json({error : post.error})
          }
          return res.status(200).json(post);
    } catch (error) {
        console.log('error de get post' , error);
        return  res.status(500).json({error : 'error interno del servidor'})
    }
}


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
    }
};


const hidePost = async (req, res) => {
    try {
        const post = await hidePostController(req);

        if (post.error) {
            return res.status(400).json({ error: post.error });
        }

        res.status(200).json(post)
    } catch (error) {
        console.error('Error en el handler de hidePost:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


const showPost = async (req, res) => {
    try {
        const post = await showPostController(req);

        if (post.error) {
            return res.status(400).json({ error: post.error });
        }

        res.status(200).json(post)
    } catch (error) {
        console.error('Error en el handler de showPost:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


const deletePostById = async (req, res) => {
    try {
        const post = await deletePostByIdController(req);

        if (post.error) {
            return res.status(400).json({ error: post.error });
        }

        res.status(200).json(`Post eliminado correctamente.`)
    } catch (error) {
        console.error('Error en el handler de deletePostById:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


const getHiddenPostsByUser = async (req, res) => {
    try {
        const posts = await getHiddenPostsByUserController(req);

        if (posts.error || posts.length === 0) {
            return res.status(404).json({ error: posts.error });
        }

        res.status(200).json(posts)
    } catch (error) {
        console.error('Error en el handler de getHiddenPostsByUser:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
};


const updatePost = async (req, res) => {
    try {
        const post = await updatePostController(req);

        if (post.error) {
            return res.status(400).json({ error: post.error });
        }

        res.status(200).json(post)
    } catch (error) {
        console.error('Error en el handler de updatePost:', error);
        return res.status(500).json({ error: 'Error interno del servidor.' });
    }
}

module.exports = {
    createPost,
    getAllPosts,
    getAllPostsByUser,
    getPostById,
    hidePost,
    showPost,
    deletePostById,
    getHiddenPostsByUser,
    updatePost,
    getPost1
};