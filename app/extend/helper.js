
var sd = require('silly-datetime');

var path = require('path');

module.exports = {


  //parmas  时间戳          13位的时间戳
  formatTime(parmas) {

    return sd.format(new Date(parmas), 'YYYY-MM-DD HH:mm');
  },

  formatImg(dir, width, height) {

    height = height || width;
    return dir + '_' + width + 'x' + height + path.extname(dir);
  }
}