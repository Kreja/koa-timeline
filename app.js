'use strict';
var comment = require('./controllers/comment');
var compress = require('koa-compress');
var logger = require('koa-logger');
var serve = require('koa-static');
var route = require('koa-route');
var koa = require('koa');
var path = require('path');
var app = module.exports = koa();

// Logger
app.use(logger());

app.use(route.get('/', comment.login)); // 首页登录页
app.use(route.post('/login', comment.handleLogin)); // 登录
app.use(route.get('/home', comment.home)); // 评论主页
app.use(route.get('/getInitData', comment.getInitData)); //获取初始数据
app.use(route.post('/add', comment.create)); // 添加评论

// Serve static files
app.use(serve(path.join(__dirname, 'build')));

// Compress
app.use(compress());

if (!module.parent) {
  app.listen(3000);
  console.log('listening on port 3000');
}
