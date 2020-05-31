'use strict';

const svgCaptcha = require('svg-captcha')
const md5 = require('md5')
const sd = require('silly-datetime')
const path = require('path')
const mkdirp = require('mz-modules/mkdirp');
const Jimp = require("jimp");  //生成缩略图的模块
const Service = require('egg').Service;

class ToolsService extends Service {

  // 生成验证码
  async captcha() {

    const captcha = svgCaptcha.create({
      size: 6,
      fontSize: 50,
      width: 100,
      height: 40,
      background: '#cc9966',
    })

    this.ctx.session.code = captcha.text

    return captcha
  }

  async md5(str) {

    return md5(str)
  }

  async getTime() {

    return new Date().getTime()
  }

  async getUploadFile(filename) {

    const day = sd.format(new Date(), 'YYYYMMDD')

    const dir = path.join(this.config.uploadDir, day)

    await mkdirp(dir)

    const d = await this.getTime()

    const uploadDir = path.join(dir, d + path.extname(filename))

    return {
      uploadDir,
      saveDir: uploadDir.slice(3).replace(/\\/g, '/')
    }
  }

  //生成缩略图的公共方法
  async jimpImg(target) {
    //上传图片成功以后生成缩略图
    Jimp.read(target, (err, lenna) => {
      if (err) throw err;

      for (var i = 0; i < this.config.jimpSize.length; i++) {
        var w = this.config.jimpSize[i].width;
        var h = this.config.jimpSize[i].height;
        lenna.resize(w, h) // resize
          .quality(90) // set JPEG quality
          .write(target + '_' + w + 'x' + h + path.extname(target));

      }

    });


  }
}

module.exports = ToolsService;
