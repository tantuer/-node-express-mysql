const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const frontendRouterConfig = require('./src/routers/frontend');
const backendRouterConfig = require('./src/routers/backend/index');
require('./src/utils/public');
const createRouter = require('./src/routers/createRouter');
const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));
app.use(addTime);

createRouter(app, frontendRouterConfig); // 创建前端路由
createRouter(app, backendRouterConfig); // 创建后端路由

// middleware
function addTime(req, res, next) {
  const date = new Date();
  if (req.method === 'POST') {
    req.body.create_time = date.format('yyyy-MM-dd hh:mm:ss');
    req.body.update_time = date.format('yyyy-MM-dd hh:mm:ss');
  }
  if (req.method === 'PUT') {
    req.body.update_time = date.format('yyyy-MM-dd hh:mm:ss');
  }
  next();
}
module.exports = app;
