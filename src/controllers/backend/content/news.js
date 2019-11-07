const news = require('../../../models/index').news;

// 新闻列表添加
exports.add = function(req, res) {
  const params = req.body;

  news.insert(params).then(data => {
    return res.json({
      code: 0,
      msg: '添加成功'
    });
  });
};

// 新闻更新
exports.update = function(req, res) {
  const params = req.body;
  news
    .update(params)
    .where({ id: req.params.id })
    .exec()
    .then(
      data => {
        if (data) {
          return res.json({
            code: 0,
            msg: '更新成功'
          });
        }
      },
      err => {
        console.log(err);
      }
    );
};

// 新闻删除
exports.delete = function(req, res) {
  const params = req.params;
  news
    .delete()
    .where({ id: params.id })
    .exec()
    .then(data => {
      if (data) {
        return res.json({
          code: 0,
          msg: '删除成功'
        });
      } else {
        return res.json({
          code: 1,
          msg: '删除失败'
        });
      }
    });
};

// 新闻列表查询
exports.query = function(req, res) {
  news
    .find()
    .orderBy({ is_top: 'desc', orders: 'asc', create_time: 'desc' })
    .exec()
    .then(data => {
      return res.json({
        code: 0,
        data: data
      });
    });
};

// 新闻详情查询
exports.queryOne = function(req, res) {
  const params = req.params;
  news
    .find()
    .where({ id: params.id })
    .exec()
    .then(data => {
      if (data.length > 0) {
        return res.json({
          code: 0,
          data: data[0]
        });
      } else {
        return res.json({
          code: 1,
          msg: '不存在该id'
        });
      }
    });
};
