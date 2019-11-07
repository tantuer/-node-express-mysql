const news = require('./news');
const moment = require('moment');
const { getCurrentLists, getPagination } = require('../../utils/public');
const pageNum = 8;

// 新闻
exports.news = function(req, res, item) {
  const currentPage = parseInt(req.query.page, 10) || 1;
  news.query('news').then(data => {
    const lists = data.map((item, index) => {
      item.update_time = moment(item.update_time).format('YYYY-MM-DD');
      return item;
    });

    res.render(`../src/views/pc/news`, {
      curUrl: '/news',
      lists: getCurrentLists(lists, pageNum, currentPage),
      pagination: getPagination(lists.length, pageNum, currentPage)
    });
  });
};

// article
function article(req, res) {
  const id = req.params.id;
  news.queryOne(id).then(data => {
    const pageInfo = data;
    pageInfo.update_time = moment(pageInfo.update_time).format('YYYY-MM-DD');

    const click_num = pageInfo.click_num;
    news.update(id, click_num);
    res.render(`../src/views/pc/article`, {
      pageInfo: pageInfo,
      title: pageInfo.title
    });
  });
}

// 新闻article
exports.newsArticle = function(req, res) {
  article(req, res);
};
