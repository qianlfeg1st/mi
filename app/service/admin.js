'use strict';

const url = require('url')

const Controller = require('egg').Controller;

class AdminController extends Controller {

  async checkAuth () {

    // 获取当前用户角色
    const userinfo = this.ctx.session.userinfo
    // 当前用户访问的地址
    const pathname = url.parse(this.ctx.request.url).pathname
    // 忽略权限判断的地址，is_super表示超级管理员
    const ignoreUrl = ['/admin/login', '/admin/doLogin', '/admn/verify', '/admin/loginOut']

    if (ignoreUrl.includes(pathname) || Number(userinfo.is_super) === 1) return true

    // 根据当前角色获取可访问的权限列表
    const accessResultArray = (await this.ctx.model.RoleAccess.find({
      role_id: userinfo.role_id,
    })).map(item => item.access_id.toString())

    // 根据访问地址查出权限id
    const accessUrlResult = await this.ctx.model.Access.find({
      url: pathname,
    })

    console.log('accessUrlResult', accessUrlResult)
    // console.log('accessResultArray', accessResultArray)

    if (accessResultArray.length && accessUrlResult.length) {

      if (accessResultArray.includes(accessUrlResult[0]._id.toString())) {

        return true
      }

      return false
    }

    return false
  }

  // 获取权限列表
  async getAuthList (role_id) {

    const result = await this.ctx.model.Access.aggregate([
      {
        $match: {
          module_id: '0',
        }
      },
      {
        $lookup: {
          from: 'access',
          localField: '_id',
          foreignField: 'module_id',
          as: 'items',
        },
      },
    ])

    const accessResultArray = (await this.ctx.model.RoleAccess.find({
      role_id,
    })).map(item => item.access_id.toString())

    for (let i = 0; i < result.length; i++) {

      if (accessResultArray.includes(result[i]._id.toString())) result[i].checked = true

      for (let j = 0; j < result[i].items.length; j++) {

        if (accessResultArray.includes(result[i].items[j]._id.toString())) result[i].items[j].checked = true
      }
    }

    return result
  }

}

module.exports = AdminController;
