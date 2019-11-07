const news = `CREATE TABLE if not exists news (
        id int(11) unsigned NOT NULL AUTO_INCREMENT,
        title varchar(255) DEFAULT NULL COMMENT '标题',
        author varchar(255) DEFAULT NULL COMMENT '作者',
        des varchar(255) DEFAULT NULL COMMENT '描述',
        orders int(11) DEFAULT '999' COMMENT '排序，数字越小越靠前',
        is_top int(1) DEFAULT 0 COMMENT '是否置顶，1--》是,0->否',
        preview_image varchar(255) DEFAULT NULL COMMENT '缩略图',
        content longtext COMMENT '详情',
        cname varchar(255) DEFAULT NULL COMMENT '别名',
        create_time datetime DEFAULT NULL COMMENT '创建时间',
        update_time datetime DEFAULT NULL COMMENT '更新时间',
        is_redirect int(1) DEFAULT 0 COMMENT '是否跳转到第三方，1--》是,0->否',
        redirect_url varchar(255) DEFAULT NULL COMMENT '标题',
        click_num int(11) DEFAULT 0 COMMENT '点击次数',
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4`;

module.exports = {
  news: news
};
