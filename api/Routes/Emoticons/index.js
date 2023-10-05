const {Router} = require('express');
const createEmoticon = require('../../handlers/Emoticons/index.js');

const routerEmoticon = Router();


routerEmoticon.post('/darLike',createEmoticon);


module.exports = {
    routerEmoticon,
}