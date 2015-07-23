'use strict';

var util = {};
util.date = {};
util.number = {};

/**
 * 个位数前面加 0
 * @param  {[type]} a [description]
 * @return {[type]}   [description]
 */
util.get2Num = function(a){
  return a.toString().replace(/^(\d)$/, "0$1");
};

/**
 * 把DATE对象 转为 14位数字 20110102235959
 *
 * @param date
 */
util.date.dateToNumber = function(date) {
  return util.date.format(date, 'yyyyMMddHHmmss');
};

/**
 * 补齐
 * @param  {[type]} source  [description]
 * @param  {[type]} pattern [description]
 * @return {[type]}         [description]
 */
util.date.format = function(source, pattern) {
  if ('string' != typeof pattern) {
    return source.toString();
  }

  function replacer(patternPart, result) {
    pattern = pattern.replace(patternPart, result);
  }

  var pad = util.number.pad, year = source.getFullYear(), month = source
      .getMonth() + 1, date2 = source.getDate(), hours = source
      .getHours(), minutes = source.getMinutes(), seconds = source
      .getSeconds();

  replacer(/yyyy/g, pad(year, 4));
  replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
  replacer(/MM/g, pad(month, 2));
  replacer(/M/g, month);
  replacer(/dd/g, pad(date2, 2));
  replacer(/d/g, date2);

  replacer(/HH/g, pad(hours, 2));
  replacer(/H/g, hours);
  replacer(/hh/g, pad(hours % 12, 2));
  replacer(/h/g, hours % 12);
  replacer(/mm/g, pad(minutes, 2));
  replacer(/m/g, minutes);
  replacer(/ss/g, pad(seconds, 2));
  replacer(/s/g, seconds);

  return pattern;
};

/**
 * 对目标数字进行0补齐处理
 * @param  {[type]} source [description]
 * @param  {[type]} length [description]
 * @return {[type]}        [description]
 */
util.number.pad = function(source, length) {
  var pre = '', negative = (source < 0), string = String(Math.abs(source));

  if (string.length < length) {
    pre = (new Array(length - string.length + 1)).join('0');
  }

  return (negative ? '-' : '') + pre + string;
};

/**
 * 随机生成 start 到 end 之间的整数
 * @param  {[type]} start [description]
 * @param  {[type]} end   [description]
 * @return {[type]}       [description]
 */
util.number.random = function(start, end){
    return Math.floor(Math.random() * (end - start) + start);
}

module.exports = util;
