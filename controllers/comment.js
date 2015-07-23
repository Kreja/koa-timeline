'use strict';
var views = require('co-views');
var parse = require('co-body');
var util = require('../lib/util');
var token = require('../lib/token');

var render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

// todo: 登录校验要改成前置

var user = {
  username: 'jack',
  password: '123',
  hasLogin: false
};

var comments = [
  {
    date: '2015-07-21 00:30',
    title: '第五组',
    txt: '啦啦啦'
  }
];

var warning = {
  msg: '你走开',
  status: -1
};

// 根据时间+随机数生成 skey
var skey = token.generateSkey();

/**
 * 登录页
 * @yield {[type]} [description]
 */
module.exports.login = function *login() {
  //逆序 最新的在前面
  this.body = yield render('login', {});
};

/**
 * 登录处理
 * @yield {[type]} [description]
 */
module.exports.handleLogin = function *handleLogin() {
  var input = yield parse(this);
  if(input.username !== user.username || input.password !== user.password){ // 错误
    this.body = warning;
  }else{ // 登录了
    user.hasLogin = true;
    this.body = {
      msg: '登录成功',
      status: 1,
      'skey': skey
    };
  }
};

/**
 * 评论页面
 * @yield {[type]} [description]
 */
module.exports.home = function *home() {
  // 未登录，跳转到 login
  if(!user.hasLogin){
    this.redirect('/');
  }else{
    //逆序 最新的在前面
    this.body = yield render('comment', {});
  }
};

/**
 * 获取初始数据
 * @yield {[type]} [description]
 */
module.exports.getInitData = function *getInitData() {
  // 未登录，跳转到 login
  if(!user.hasLogin){
    this.redirect('/');
  }else{
    //逆序 最新的在前面
    this.body = {
      msg: '获取成功',
      status: 1,
      'comments': comments
    };
  }
};

/**
 * 添加新内容
 * @yield {[type]} [description]
 */
module.exports.create = function *create() {
  var comment = yield parse(this);

  var g_tk = token.getToken(skey);

  // 校验 g_tk
  if(comment.g_tk != g_tk){
    this.body = warning;
  }else{
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

    // 生成新的 skey
    skey = token.generateSkey();

    this.body = {
      msg: '添加成功',
      status: 1,
      newCom: comment,
      'skey': skey
    };
  }
};
