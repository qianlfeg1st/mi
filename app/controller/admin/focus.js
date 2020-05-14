'use strict';

const path = require('path');
const fs = require('fs');
const pump = require('mz-modules/pump');

const BaseController = require('./base.js')

class FocusController extends BaseController {

  async index () {

    await this.ctx.render('admin/focus/index')
  }

  async add () {

    await this.ctx.render('admin/focus/add')
  }

  async doAdd () {

    const parts = this.ctx.multipart({
      autoFields: true,
    })

    let stream
    let files = {}

    while ((stream =await parts()) != null) {

      if (!stream.filename) {

        break
      }

      const fieldname = stream.fieldname

      // 上传图片的目录
      const dir = await this.service.tools.getUploadFile(stream.filename)

      const target = dir.uploadDir

      const writeStream = fs.createWriteStream(target)

      await pump(stream, writeStream)

      files = {
        ...files,
        [fieldname]: dir.saveDir,
      }
    }

    // this.ctx.body = {
    //   files,
    //   fields: parts.field,
    // }

    const focus = new this.ctx.model.Focus({
      ...files,
      ...parts.field,
    })

    const result =  await focus.save()

    await this.success('/admin/focus', '增加轮播图成功')
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


  }

}

module.exports = FocusController;
