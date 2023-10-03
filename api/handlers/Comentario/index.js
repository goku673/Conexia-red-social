const createComentController = require('../../controllers/Comentario/index.js');


const createComentario = async(req,res) => {

     try {

           const {comentario, idUser,idPublicacion} = req.body;
           if(comentario && idPublicacion && idUser){
              const createText = await  createComentController(comentario, idUser,idPublicacion);
            return  res.status(200).json(createText);
           }
        return res.status(200).send("error");
        
     } catch (error) {
        res.status(400).json({error:error});
     }
}

module.exports = createComentario;