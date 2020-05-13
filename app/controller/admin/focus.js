'use strict';

const path = require('path');
const fs = require('fs');
const pump = require('mz-modules/pump');

const Controller = require('egg').Controller;

class FocusController extends Controller {

  async index() {

    await this.ctx.render('admin/focus/index')
  }

  // 单文件上传
  async doSingleUpload () {

    // 获取表单提交的文件流
    const stream = await this.ctx.getFileStream()

    const { fields, filename } = stream

    if (!filename) return

    // 上传的目录，注意目录要存在
    const target = `app/public/admin/upload/${path.basename(filename)}`

    // 创建可写流
    const writeStream = fs.createWriteStream(target)

    // 写入流
    await pump(stream, writeStream)

    this.ctx.body = {
      target,
      fields,
    }
  }

  // 多文件上传
  async multi () {

    await this.ctx.render('admin/focus/multi')
  }

  // 多文件上传
  async doMultiUpload() {

    const parts = this.ctx.multipart({
      autoFields: true,
    })

    let stream
    const files = []

    while ((stream =await parts()) != null) {

      if (!stream.filename) return

      const fieldname = stream.fieldname
      const target = `app/public/admin/upload/${path.basename(stream.filename)}`
      const writeStream = fs.createWriteStream(target)
      await pump(stream, writeStream)

      files.push({
        [fieldname]: target,
      })
    }

    this.ctx.body = {
      files,
      fields: parts.field,
    }
  }

}

module.exports = FocusController;
