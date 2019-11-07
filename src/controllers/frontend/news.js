const news = require('../../models/index').news;

// 列表查询
exports.query = async function(type) {
  return await news
    .find()
    .orderBy({ is_top: 'desc', orders: 'asc', create_time: 'desc' })
    .exec()
    .then(data => {
      return data;
    });
};

// 详情查询
exports.queryOne = async function(id) {
  return await news
    .find()
    .where({ id: id })
    .exec()
    .then(data => {
      return data[0];
    });
};

// 新闻更新
exports.update = function(id, num) {
  const params = { click_num: num + 1 };
  news
    .update(params)
    .where({ id: id })
    .exec()
    .then(
      data => {},
      err => {
        console.log(err);
      }
    );
};
