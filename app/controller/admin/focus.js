'use strict';

const path = require('path');
const fs = require('fs');
const pump = require('mz-modules/pump');

const BaseController = require('./base.js')

class FocusController extends BaseController {

  async index () {

    await this.ctx.render('admin/focus/index', {
      list: await this.ctx.model.Focus.find(),
    })
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

    const focus = new this.ctx.model.Focus({
      ...files,
      ...parts.field,
    })

    const result =  await focus.save()

    await this.success('/admin/focus', '增加轮播图成功')
  }

  async edit () {

    const result = await this.ctx.model.Focus.find({
      _id: this.ctx.query.id
    })

    await this.ctx.render('admin/focus/edit', {
      list: result[0],
    })
  }

  async doEdit () {

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

    const result = await this.ctx.model.Focus.updateOne({
      _id: parts.field.id,
    }, {
      ...files,
      ...parts.field,
    })


    await this.success('/admin/focus', '编辑轮播图成功')
  }

}

module.exports = FocusController;
