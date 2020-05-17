'use strict';

const BaseController = require('./base.js')

class LoginController extends BaseController {

  async index() {

    await this.ctx.render('admin/login');
  }

  // 执行登陆的方法 POST
  async doLogin () {

    let { username, password, verify } = this.ctx.request.body

    password = await this.service.tools.md5(password)

    // if (verify.toUpperCase() !== this.ctx.session.code.toUpperCase()) return await this.error('/admin/login', '验证码错误')

    const result = await this.ctx.model.Admin.find({
      username,
      password,
    })

    // console.log('~~~~', result, password)

    // 登陆成功
    if (result.length) {

      // 保存用户信息
      this.ctx.session.userinfo = result[0]

      // 跳转到用户中心
      this.ctx.redirect('/admin')
    } else {

      await this.error('/admin/login', '用户名或密码错误')
    }
  }

  async loginOut () {

    this.ctx.session.userinfo = null

    // 跳转到登陆页
    this.ctx.redirect('/admin/login')
  }
}

module.exports = LoginController;
