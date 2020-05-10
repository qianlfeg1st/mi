'use strict';

const BaseController = require('./base.js')

class ManagerController extends BaseController {

  async index () {

    const result = await this.ctx.model.Admin.aggregate([{
      $lookup: {
        from: 'rule',
        localField: 'role_id',
        foreignField: '_id',
        as: 'rule',
      }
    }])

    await this.ctx.render('admin/manager/index', {
      list: result,
    })
  }

  async add () {

    await this.ctx.render('admin/manager/add', {
      roleResult: await this.ctx.model.Rule.find()
    })
  }

  async doAdd () {

    const body = this.ctx.request.body

    // 判断当前用户名是否被占用
    const adminResult = await this.ctx.model.Admin.find({
      username: body.username,
    })

    if (adminResult.length > 0) {

      await this.error('/admin/manager/add', '此用户已存在')
    } else {

      const admin = this.ctx.model.Admin({
        ...body,
        password: await this.service.tools.md5(body.password),
      })

      admin.save()

      await this.success('/admin/manager', '增加用户成功')
    }
  }

  async edit () {

    const adminResult = await this.ctx.model.Admin.find({
      _id: this.ctx.query.id,
    })

    await this.ctx.render('admin/manager/edit', {
      roleResult: await this.ctx.model.Rule.find(),
      adminResult: adminResult[0],
    })
  }

  async doEdit () {

    const { password, id, mobile, email, role_id } = this.ctx.request.body

    await this.ctx.model.Admin.updateOne({
      _id: id,
    }, {
      mobile,
      email,
      role_id,
      password: password ? await this.service.tools.md5(password) : undefined,
    })

    await this.success('/admin/manager', '修改用户成功')
  }

}

module.exports = ManagerController;
