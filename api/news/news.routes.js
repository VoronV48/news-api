const News = require('./news.controller');
const auth = require('../user/user.controller');
const authMidleware = require('../midleware/auth')
module.exports = function(router) {
    router.post('/create', News.createNews);
    router.get('/news', News.getNews);
    router.get('/find/:title', News.findNews);
    router.put('/update/:id',authMidleware, News.updateNews);
    router.delete('/remove/:id',authMidleware, News.removeNews);

    router.post('/signin', auth.signIn);

}