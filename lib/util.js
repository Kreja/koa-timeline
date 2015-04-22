'use strict';

var util = {
  /**
   * 个位数前面加 0
   * @param  {[type]} a [description]
   * @return {[type]}   [description]
   */
  get2Num(a) {
    return a.toString().replace(/^(\d)$/, "0$1");
  }
};

module.exports = util;
