const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * 创建深层目录
 * @param dirpath
 * @param mode
 */
exports.mkdirs = function (dirpath, mode) {
  mode = mode || '777';
  if (!fs.existsSync(dirpath)) {
    //尝试创建父目录，然后再创建当前目录
    exports.mkdirs(path.dirname(dirpath), mode);
    fs.mkdirSync(dirpath, mode);
  }
};

/**
 * 删除深层目录
 * @param dirpath
 */
exports.rmdirs = function (dirpath) {
  try {
    fs.readdirSync(dirpath).forEach(function (filepath) {
      var state = fs.statSync(path.join(dirpath, filepath));
      if (state.isDirectory()) {
        exports.rmdirs(path.join(dirpath, filepath));
      } else {
        fs.unlinkSync(path.join(dirpath, filepath));
      }
    });
    fs.rmdirSync(dirpath);
  } catch (e) {
    console.log(e);
  }
};