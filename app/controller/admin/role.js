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

  async auth () {

    const role_id = this.ctx.query.id

    const result = await this.service.admin.getAuthList(role_id)

    await this.ctx.render('/admin/role/auth', {
      list: result,
      role_id,
    })
  }

  async doAuth () {

    const { role_id, access_node } = this.ctx.request.body

    //删除当前角色下面的所有权限
    await this.ctx.model.RoleAccess.deleteMany({
      role_id,
    })

    if (access_node) {

      //给role_access增加数据 把获取的权限和角色增加到数据库
      for (let i = 0; i < access_node.length; i++) {

        const roleAccessData = new this.ctx.model.RoleAccess({
          role_id,
          access_id: access_node[i]
        })

        roleAccessData.save()
      }
    }

    await this.success(`/admin/role/auth?id=${role_id}`, '授权成功')
  }
}

module.exports = RoleController;
