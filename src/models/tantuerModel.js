const { query, connection, mysql } = require('../schemas/schema');

class TantuerModel {
  constructor(tableName) {
    this.table = tableName;
    this.sql = ``;
    this.isHasWhere = false;
    this.sqlType = ``;
    this.mysql = mysql;
    this.isUpdateSet = false;
    this.connection = connection;
  }
  /** 根据某一查询条件，查询一条数据
   * @params: object
   */
  find(params) {
    this.sql = params
      ? `SELECT ${params} FROM ${this.table}`
      : `SELECT * FROM ${this.table}`;
    this.sqlType = 'find';
    return this;
  }

  /** 查询全部数据
   * @params: object
   */
  findAll(params) {
    this.sql = params
      ? `SELECT ${params} FROM ${this.table}`
      : `SELECT * FROM ${this.table}`;
    this.sqlType = 'findAll';
    return this;
  }

  /** 插入数据
   * @params: object
   */
  update(params) {
    this.sql = `UPDATE ${this.table}`;
    this.sqlType = 'update';
    this.setParams = this.updateQuery(params);
    // this.sql = this.sql + this.setParams;
    return this;
  }

  /** 插入数据
   * ...params
   */
  insert(...params) {
    const keys = Object.keys(params[0]);
    const values = params.map(item => {
      return Object.values(item);
    });
    const querySql = `INSERT INTO ${this.table}(${keys.join(',')}) VALUES ?`;
    return new Promise((resolve, reject) => {
      query(querySql, [values], function(error, results) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  updateQuery(param) {
    let setParams = '';
    let index = 0;
    for (const key in param) {
      let query = '';
      const value = param[key];
      if (value) {
        // 如果value为数组，则为['>','1']这样的格式
        if (value instanceof Array) {
          const character = value[0];
          let val = value[1];
          switch (character) {
            case 'count':
              query = `${key}=${val}`;
              break;
            default:
              query = `${key}='${val}'`;
              break;
          }
        } else {
          if (typeof value === 'string' || typeof value === 'number') {
            query = `${key} = '${value}'`;
          }
        }

        setParams += index !== 0 ? `,${query}` : `${query}`;
        index++;
      }
    }
    return setParams;
  }

  /** 删除操作
   */
  delete() {
    this.sql = `DELETE FROM ${this.table}`;
    this.sqlType = 'delete';
    return this;
  }

  /** 查询条件
   * ...params {id:id,name:name} and 关系
   * {id:id},{name:name} or 关系
   */
  where(...params) {
    if (this.sqlType === 'update') {
      this.sql = this.sql + ' SET ' + this.setParams;
      this.isUpdateSet = true;
    }
    if (params.length === 0 || Object.keys(params[0]).length === 0) {
      return this;
    }
    this.sql = `${this.sql} WHERE`;
    this.sql = this.query(params);
    return this;
  }

  /** 查询条件 on
   * ...params {id:id,name:name} and 关系
   * {id:id},{name:name} or 关系
   */
  on(...params) {
    if (params.length === 0 || Object.keys(params[0]).length === 0) {
      return this;
    }
    this.sql = `${this.sql} ON`;
    this.sql = this.query(params);
    return this;
  }

  query(params) {
    params.forEach((param, index) => {
      let sql = ``;
      let query = ``;
      for (const key in param) {
        const value = param[key];

        // 如果value为数组，则为['>','1']这样的格式
        if (value instanceof Array) {
          const character = value[0];
          let val = value[1];
          if (val instanceof Array) {
            val = val.map(it => `"${it}"`).join(',');
          }
          const k =
            key.indexOf('.') !== -1 || key.indexOf('(')
              ? key
              : `${connection.escapeId(key)}`;
          const v =
            key.indexOf('.') !== -1 || key.indexOf('(') ? val : `'${val}'`;
          switch (character) {
            case '=':
              query = `${k} = ${v}`;
              break;
            case '!=':
              query = `${k} != ${v}`;
              break;
            case '>':
              query = `${k} > ${v}`;
              break;
            case '>=':
              query = `${k} >= ${v}`;
              break;
            case '<':
              query = `${k} < ${v}`;
              break;
            case '<=':
              query = `${k} <= ${v}`;
              break;
            case 'in':
            case 'IN':
              query = `${k} IN(${val})`;
              break;
            case 'not in':
            case 'NOT IN':
              query = `${k} NOT IN(${val})`;
              break;
            case 'like':
            case 'LIKE':
              query = `${k} LIKE ${v}`;
              break;
            case 'not like':
            case 'NOT LIKE':
              query = `${k} LIKE ${v}`;
              break;
            case 'between and':
            case 'BETWEEN AND':
              const first = val.split(',')[0];
              const last = val.split(',')[1];
              query = `${connection.escapeId(
                key
              )} BETWEEN ${first} AND ${last}`;
              break;
          }
        } else {
          if (typeof value === 'string' || typeof value === 'number') {
            const k = key.indexOf('.') !== -1 ? key : connection.escapeId(key);
            const v = key.indexOf('.') !== -1 ? value : `'${value}'`;
            query = `${k} = ${v}`;
          }
        }
        sql = sql ? `${sql} AND ${query}` : query;
      }
      this.sql = index === 0 ? `${this.sql} ${sql}` : `${this.sql} OR ${sql}`;
    });
    return this.sql;
  }

  /** 排序
   * @params {key:value} key: 排序字段名， value: 排序方法，asc,desc
   */
  orderBy(params) {
    let orders = '';
    for (const key in params) {
      orders = orders
        ? `${orders},${connection.escapeId(key)} ${params[key]}`
        : `${connection.escapeId(key)} ${params[key]}`;
    }
    this.sql = `${this.sql} ORDER BY ${orders}`;
    return this;
  }

  /**分组
   * @id 条件
   */
  groupBy(id) {
    this.sql = `${this.sql} GROUP BY ${id}`;
    return this;
  }

  /** 执行 */
  exec() {
    this.values = [];
    if (this.sqlType === 'findAll') {
      return new Promise((resolve, reject) => {
        query(this.sql, function(error, results) {
          if (error) reject(error);
          resolve(results);
        });
      });
    }
    if (this.sqlType === 'update') {
      if (!this.isUpdateSet) {
        this.sql = this.sql + ' SET ' + this.setParams;
      }

      return new Promise((resolve, reject) => {
        query(this.sql, function(error, results) {
          if (error) reject(error);
          resolve(results);
        });
      });
    }
    return new Promise((resolve, reject) => {
      query(this.sql, this.values, function(error, results) {
        if (error) reject(error);
        resolve(results);
      });
    });
  }

  /* 多表查询
   * @params: table1,table2
   * @direction: left,right
   */
  join(params, direction) {
    if (direction) {
      switch (direction) {
        case 'left':
        case 'LEFT':
          this.sql = `${this.sql} LEFT JOIN ${params.table}`;
          break;
        case 'right':
        case 'RIGHT':
          this.sql = `${this.sql} RIGHT JOIN ${params.table}`;
          break;
        default:
          this.sql = `${this.sql} JOIN ${params.table}`;
      }
    } else {
      this.sql = `${this.sql} JOIN ${params.table}`;
    }
    return this;
  }
}
module.exports = TantuerModel;
