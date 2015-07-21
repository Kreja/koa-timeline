'use strict';
var views = require('co-views');
var parse = require('co-body');
var util = require('../lib/util');

var render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

var comments = [
  {
    date: '2015-07-21 00:30',
    title: '第五组',
    txt: '啦啦啦'
  }
];

/**
 * 主页
 * @yield {[type]} [description]
 */
module.exports.home = function *home() {
  //逆序 最新的在前面
  this.body = yield render('comment', {});
};

/**
 * 获取初始数据
 * @yield {[type]} [description]
 */
module.exports.getInitData = function *getInitData() {
  //逆序 最新的在前面
  this.body = {
    msg: '获取成功',
    status: 1,
    'comments': comments
  };
};

/**
 * 添加新内容
 * @yield {[type]} [description]
 */
module.exports.create = function *create() {
  var comment = yield parse(this);

  //校验
  if(!comment.title || !comment.txt){
    this.body = {
      msg: '标题和内容必填~',
      status: -1
    };
  }

  //处理时间
  var date = new Date(comment.date);
  var year = date.getFullYear();
  var month = util.get2Num(date.getMonth()+1);
  var day = util.get2Num(date.getDate());
  var hour = util.get2Num(date.getHours());
  var minute = util.get2Num(date.getMinutes());
  comment.date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;

  comments.push(comment);

  this.body = {
    msg: '添加成功',
    status: 1,
    newCom: comment
  };
};
