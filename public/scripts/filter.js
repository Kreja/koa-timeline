'use strict';

var utils = {
  isArray : isArray = (Array.hasOwnProperty('isArray')) ? Array.isArray : function (obj) {
    return (obj) ? (typeof obj === 'object' && Object.prototype.toString.call(obj).indexOf() !== -1) : false;
  },
  map : function (obj, fn) {
    var i = 0,
      result = [],
      l;

    if (isArray(obj)) {
      l = obj.length;
      for (i; i < l; i += 1) {
        result[i] = fn(obj[i], i);
      }
    } else {
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          result[i] = fn(obj[i], i);
        }
      }
    }
    return result;
  },
  each : function (obj, fn) {
    var i, l;

    if (isArray(obj)) {
      i = 0;
      l = obj.length;
      for (i; i < l; i += 1) {
        if (fn(obj[i], i, obj) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (fn(obj[i], i, obj) === false) {
            break;
          }
        }
      }
    }

    return obj;
  }
};


function iterateFilter(input) {
  var self = this,
    out = {};

  if (utils.isArray(input)) {
    return utils.map(input, function (value) {
      return self.apply(null, arguments);
    });
  }

  if (typeof input === 'object') {
    utils.each(input, function (value, key) {
      out[key] = self.apply(null, arguments);
    });
    return out;
  }

  return;
}

var filter = {
  escape : function (input, type) {
    var out = iterateFilter.apply(this, arguments),
      inp = input,
      i = 0,
      code;

    if (out !== undefined) {
      return out;
    }

    if (typeof input !== 'string') {
      return input;
    }

    out = '';

    switch (type) {
      case 'js':
        inp = inp.replace(/\\/g, '\\u005C');
        for (i; i < inp.length; i += 1) {
          code = inp.charCodeAt(i);
          if (code < 32) {
            code = code.toString(16).toUpperCase();
            code = (code.length < 2) ? '0' + code : code;
            out += '\\u00' + code;
          } else {
            out += inp[i];
          }
        }
        return out.replace(/&/g, '\\u0026')
          .replace(/</g, '\\u003C')
          .replace(/>/g, '\\u003E')
          .replace(/\'/g, '\\u0027')
          .replace(/"/g, '\\u0022')
          .replace(/\=/g, '\\u003D')
          .replace(/-/g, '\\u002D')
          .replace(/;/g, '\\u003B');

      default:
        return inp.replace(/&(?!amp;|lt;|gt;|quot;|#39;)/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;');
    }
  }
};
