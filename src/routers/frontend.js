const frontendUrl = '';
const view = require('../controllers/frontend/index');

// 新闻列表路由

const newsRouter = [
  {
    url: `${frontendUrl}/news`,
    type: 'get',
    auth: false,
    right: 0,
    method: view.news
  },
  {
    url: `${frontendUrl}/news/:id`,
    type: 'get',
    auth: false,
    right: 0,
    method: view.newsArticle
  }
];

const routerConfig = [...newsRouter];
module.exports = routerConfig;
