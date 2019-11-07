/** 分类分组
 *  @params arr: 上级被遍历的数组
 *  @params obj: 存放的以pid为key的对象数组
 *  @params cb:  回调函数,一般用于处理字段重置，如filterData
 *  @return newArr: 新的数组
 *  */
function cateToGroup(arr, obj, cb) {
  const newArr = [];

  arr.forEach(item => {
    if (item.id in obj) {
      item.children = cateToGroup(obj[item.id], obj, cb);
    }
    const newItem = cb ? cb(item) : item;
    newArr.push(newItem);
  });
  return newArr;
}

/** 过滤重组返回数据
 * @params fields {title:'name',url:'url',value: '_id'}
 * @return Object {title:item.name, url: item.url, value: item._id}
 */
function filterData(item, fields) {
  const newItem = {};
  Object.keys(fields).forEach(key => {
    newItem[key] = item[fields[key]];
  });
  return newItem;
}

/** 过滤权限数据
 *  */
function filterRightData(data, right) {
  const newData = data.filter(item => {
    return !item.right_level || right >= item.right_level;
  });
  return newData;
}

/** 扩展 Date format */
Date.prototype.format = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    S: this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};

/** pagination */
getPagination = function(total, pageNum, current) {
  let totalPage = Math.ceil(total / pageNum);
  let first = 0;
  let last = 0;

  const pagination = {
    current: 0,
    group: [],
    prev: false,
    next: false,
    totalPage: 0,
    total: total
  };

  //当总页数小于1，返回
  if (totalPage < 1) {
    return pagination;
  }

  /*
   * 设置页数
   */

  if (totalPage <= 10) {
    // 当总页数小于10
    first = 1;
    last = totalPage;
  } else {
    // 当总页数大于10
    if (current - 5 >= 1 && current + 4 <= totalPage) {
      first = current - 5;
      last = current + 4;
    } else {
      if (current - 5 < 1) {
        first = 1;
        last = 10;
      }
      if (current + 4 > totalPage) {
        first = totalPage - 9;
        last = totalPage;
      }
    }
  }
  for (var i = first; i <= last; i++) {
    pagination.group.push(i);
  }

  // 设置上下页
  if (current == 1) {
    pagination.prev = false;
  } else {
    pagination.prev = current - 1;
  }
  if (current == totalPage) {
    pagination.next = false;
  } else {
    pagination.next = current + 1;
  }

  // 设置总页数与当前页
  pagination.totalPage = totalPage;
  pagination.current = current;
  return pagination;
};

// 查找当前页列表
getCurrentLists = function(data, pageNum, current) {
  return data.filter((item, index) => {
    return index >= pageNum * (current - 1) && index < pageNum * current;
  });
};

/* 获取指定key数组组成的对象参数
 * @params 传入的对象
 * @arr 指定key组成的数组
 */
getParamsByKeyArr = function(params, arr) {
  const newParams = {};
  Object.keys(params).forEach(key => {
    if (arr.includes(key)) {
      newParams[key] = params[key];
    }
  });
  return newParams;
};

/* 自动生成编号 startString+1560583245501(时间戳)
 *
 */
function createOrderId(startString) {
  const newDate = new Date();
  return `${startString}${Number(newDate)}`;
}

function getParamsUrl(url, params) {
  if (Object.keys(params).length !== 0) {
    let str = '';
    for (const key in params) {
      str =
        str !== '' ? `${str}&${key}=${params[key]}` : `${key}=${params[key]}`;
    }
    return `${url}?${str}`;
  } else {
    return url;
  }
}

module.exports = {
  cateToGroup: cateToGroup,
  filterData: filterData,
  filterRightData: filterRightData,
  getPagination: getPagination,
  getCurrentLists: getCurrentLists,
  getParamsByKeyArr,
  createOrderId,
  getParamsUrl
};
