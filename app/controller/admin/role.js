'use strict';

const BaseController = require('./base.js')

class RoleController extends BaseController {

  async index () {

    const result = await this.ctx.model.Rule.find({})

    await this.ctx.render('admin/role/index', {
      list: result,
    })
  }

  async doAdd () {

    const { title, description } = this.ctx.request.body

    const role = new this.ctx.model.Rule({
      title,
      description,
    })

    await role.save()

    await this.success('/admin/role', '增加角色成功')
  }

  async doEdit () {

    const { _id, title, description } = this.ctx.request.body

    const result = await this.ctx.model.Rule.updateOne({
      _id,
    }, {
      title,
      description,
    })

    if (result) {

      await this.success('/admin/role', '编辑角色成功')
    } else {

      await this.error('/admin/role', '编辑角色失败')
    }
  }

  async add() {


    await this.ctx.render('admin/role/add');

  }

  async edit () {

    const result = await this.ctx.model.Rule.find({
      _id: this.ctx.query.id,
    })

    await this.ctx.render('admin/role/edit', {
      list: result[0],
    })
  }


  async delete() {


    this.ctx.body = '角色删除'

  }
}

module.exports = RoleController;
