

const logGoogle = async(req,res) => {
    try {
        const user = req.user;
        if(user){
          return  res.status(299).send('<h1>Hola mundo </h1>')
        }
        return res.status(401).json({message: 'autenticacion con google fallida' });
    } catch (error) {
        res.status(500).json({error : error.toString()});  
    }
}

module.exports = logGoogle;