const mysql = require('mysql');
const { news } = require('../data/mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'test'
});
const query = function(sql, params, callback) {
  connection.query(sql, params, function(error, results, fields) {
    callback && callback(error, results, fields);
  });
};
const createTable = function(sql) {
  query(sql, [], function(error, results, fields) {
    error && console.log(error);
  });
};
// 建表
createTable(news);

module.exports = {
  query: query,
  connection: connection,
  mysql: mysql
};
