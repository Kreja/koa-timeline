'use strict';
var util = require('./util');

var token = {};

/**
 * 生成 skey
 */
token.generateSkey = function(){
  return util.date.dateToNumber(new Date()) + util.number.random(100,233333);
}

/**
 * skey 转成 g_tk
 * @param  {[type]} skey [description]
 * @return {[type]}      [description]
 */
token.getToken = function(skey){
    return skey == null ? "" : token.time33(skey);
}

/**
 * time33
 * @param  {[type]} str [description]
 * @return {[type]}     [description]
 */
token.time33 = function(str){
    str = typeof str == 'string' ? str : str.toString();

    //哈希time33算法
    for(var i = 0, len = str.length,hash = 5381; i < len; ++i){
       hash += (hash << 5) + str.charAt(i).charCodeAt();
    };

    return hash & 0x7fffffff;
};

module.exports = token;
