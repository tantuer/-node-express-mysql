const backendUrl = require('../utils/constant').backendUrl;
class CreateRestfulApi {
  constructor(api, model, auth) {
    this.apiUrl = `${backendUrl}${api}`;
    this.model = model;
    this.auth = auth ? auth : false;
  }
  getRouters() {
    const routers = [];
    if (this.model.add) {
      routers.push({
        url: this.apiUrl,
        type: 'post',
        auth: this.auth,
        method: this.model.add
      });
    }
    if (this.model.update) {
      routers.push({
        url: `${this.apiUrl}/:id`,
        type: 'put',
        auth: this.auth,
        method: this.model.update
      });
    }
    if (this.model.query) {
      routers.push({
        url: this.apiUrl,
        type: 'get',
        auth: this.auth,
        method: this.model.query
      });
    }
    if (this.model.delete) {
      routers.push({
        url: `${this.apiUrl}/:id`,
        type: 'delete',
        auth: this.auth,
        method: this.model.delete
      });
    }
    if (this.model.queryOne) {
      routers.push({
        url: `${this.apiUrl}/:id`,
        type: 'get',
        auth: this.auth,
        method: this.model.queryOne
      });
    }
    return routers;
  }
}

module.exports = CreateRestfulApi;
