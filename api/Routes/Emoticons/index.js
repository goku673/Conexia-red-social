const {Router} = require('express');
const {
    createEmoticon,
    deteteEmoticon} = require('../../handlers/Emoticons/index.js');

const routerEmoticon = Router();


routerEmoticon.post('/darLike',createEmoticon);
routerEmoticon.delete('/delete/:idEmoticon',deteteEmoticon);

module.exports = {
    routerEmoticon,
}