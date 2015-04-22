'use strict';
var views = require('co-views');
var parse = require('co-body');
var util = require('../lib/util');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koaTimeline');
var dbMessages = wrap(db.get('messages'));

var render = views(__dirname + '/../views', {
  map: { html: 'swig' }
});

/**
 * 主页
 * @yield {[type]} [description]
 */
module.exports.home = function *home() {
  var msgs = yield dbMessages.find({});
  //逆序 最新的在前面
  this.body = yield render('timeline', { 'messages': msgs.reverse() });
};

/**
 * 列表数据
 * @yield {[type]} [description]
 */
module.exports.list = function *list() {
  this.body = yield dbMessages.find({});
};

/**
 * 详细信息 详细页
 * @param {[type]} id            [description]
 * @yield {[type]} [description]
 */
module.exports.fetch = function *fetch(id) {
  try{
    var message = yield dbMessages.findOne({_id:id});
  }catch(e){
    this.throw(404, 'id 信息不正确，查询出错啦！(￣m￣)');
  }
  if (!message) {
    this.throw(404, 'id 为 ' + id + ' 的信息不存在！o(╯□╰)o');
  }
  this.body = yield render('detail', { 'message': message });
};

/**
 * 添加新内容
 * @yield {[type]} [description]
 */
module.exports.create = function *create() {
  var message = yield parse(this);

  //校验
  if(!message.title || !message.txt){
    this.body = {
      msg: '标题和内容必填~',
      status: -1
    };
  }

  //处理时间
  var date = new Date(message.date);
  var year = date.getFullYear();
  var month = util.get2Num(date.getMonth()+1);
  var day = util.get2Num(date.getDate());
  var hour = util.get2Num(date.getHours());
  var minute = util.get2Num(date.getMinutes());
  message.date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;

  yield dbMessages.insert(message); //message 会增加 _id
  this.body = {
    msg: '添加成功',
    status: 1,
    newMsg: message
  };
};

/**
 * 删除
 * @yield {[type]} [description]
 */
module.exports.del = function *del() {
  var data = yield parse(this);
  var id = data.id || '';

  try{
    yield dbMessages.remove({_id:id});
  }catch(e){
    this.body = {
      msg: '删除失败',
      status: -1
    };
    return;
  }

  this.body = {
    msg: '删除成功',
    status: 1
  };
};

/**
 * 编辑
 * @yield {[type]} [description]
 */
module.exports.edit = function *edit() {
  var message = yield parse(this);

  //校验
  if(!message.title || !message.txt){
    this.body = {
      msg: '标题和内容必填~',
      status: -1
    };
  }

  try{
    var editRes = yield dbMessages.update({_id:message.id},{$set:{
      title:message.title,
      txt:message.txt
    }});
  }catch(e){
    this.body = {
      msg: '编辑失败',
      status: -1
    };
    return;
  }

  if(editRes===1){
    this.body = {
      msg: '编辑成功',
      status: 1,
      editedMsg: yield dbMessages.findOne({_id:message.id})
    };
  }else{
    this.body = {
      msg: '编辑出错了，该记录不存在',
      status: -1
    };
  }
}

function doSomeAsync() {
  return function (callback) {
    setTimeout(function () {
      callback(null, 'this was loaded asynchronously and it took 3 seconds to complete');
    }, 3000);
  };
}

// One way to deal with asynchronous call
module.exports.delay = function *delay() {
  this.body = yield doSomeAsync();
};
