const {Router} = require('express');
const createEmoticon = require('../../handlers/Emoticons/index.js');

const routerEmoticon = Router();


routerEmoticon.post('/',createEmoticon);


module.exports = {
    routerEmoticon,
}