'use strict';

const BaseController = require('./base.js')

class AccessController extends BaseController {

  async index () {

    const result = await this.ctx.model.Access.aggregate([
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
      {
        $match: {
          module_id: '0',
        }
      }
    ])

    await this.ctx.render('admin/access/index', {
      list: result,
    })
  }


  async add () {

    const result = await this.ctx.model.Access.find({
      module_id: '0',
    })

    await this.ctx.render('admin/access/add', {
      moduleList: result,
    })
  }

  async doAdd () {

    const module_id = this.ctx.request.body.module_id

    const access = this.ctx.model.Access({
      ...this.ctx.request.body,
      // module_id 0 表示为顶级模块，非顶级模块必须存ObjectId，顶级模块存StringId
      module_id: module_id === '0' ? module_id : this.app.mongoose.Types.ObjectId(module_id),
    })

    access.save()

    await this.success('/admin/access', '增加权限成功')
  }

  async edit() {

    await this.ctx.render('admin/access/edit', {
      moduleList: await this.ctx.model.Access.find({
        module_id: '0',
      }),
      list: (await this.ctx.model.Access.find({
        _id: this.ctx.request.query.id,
      }))[0]
    })
  }

  async doEdit () {

    const { module_id, id } = this.ctx.request.body

    const result = await this.ctx.model.Access.updateOne({
      _id: id,
    }, {
      ...this.ctx.request.body,
      // module_id 0 表示为顶级模块，非顶级模块必须存ObjectId，顶级模块存StringId
      module_id: module_id === '0' ? module_id : this.app.mongoose.Types.ObjectId(module_id),
    })

    await this.success('/admin/access', '编辑权限成功')
  }
}

module.exports = AccessController;
