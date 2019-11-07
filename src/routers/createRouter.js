function createRouter(app, routerConfig) {
  routerConfig.forEach((item, index) => {
    app[item.type](item.url, function(req, res) {
      item.method(req, res, item);
    });
  });
}

module.exports = createRouter;
