const singlePages = require('../../models/index').singlePages;

// 单页详情查询
exports.queryOne = async function(id) {
  return await singlePages
    .find()
    .where({ id: id })
    .exec()
    .then(data => {
      return data[0];
    });
};
