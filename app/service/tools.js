'use strict';

const svgCaptcha = require('svg-captcha')
const md5 = require('md5')
const sd = require('silly-datetime')
const path = require('path')
const mkdirp = require('mz-modules/mkdirp');
const Service = require('egg').Service;

class ToolsService extends Service {

  // 生成验证码
  async captcha () {

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

  async md5 (str) {

    return md5(str)
  }

  async getTime () {

    return new Date().getTime()
  }

  async getUploadFile (filename) {

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
}

module.exports = ToolsService;
