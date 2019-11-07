const CreateRestfulApi = require('../../createRestfulApi');
const news = require('../../../controllers/backend/content/news');
const restfulApi = new CreateRestfulApi('/news', news, false).getRouters();

// 新闻路由
const newsRouter = [...restfulApi];
module.exports = newsRouter;
