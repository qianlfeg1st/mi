//父类

'use strict';



const Controller = require('egg').Controller;

class BaseController extends Controller {

  async success(redirectUrl, message) {

    // this.ctx.body='成功';

    await this.ctx.render('admin/public/success', {
      redirectUrl: redirectUrl,
      message: message || '操作成功!'
    });
  }

  async error(redirectUrl, message) {

    // this.ctx.body='成功';

    await this.ctx.render('admin/public/error', {
      redirectUrl: redirectUrl,
      message: message || '操作成功!'
    });

  }

  async verify() {

    var captcha = await this.service.tools.captcha();  //服务里面的方法

    this.ctx.response.type = 'image/svg+xml';   /*指定返回的类型*/

    this.ctx.body = captcha.data;      /*给页面返回一张图片*/
  }

  // 删除方法
  async delete () {

    const { model, id } = this.ctx.request.query

    await this.ctx.model[model].deleteOne({
      _id: id,
    })

    this.ctx.redirect(this.ctx.request.headers.referer)
  }

  // 改变状态的方法
  async changeStatus () {

    const { model, attr, id } = this.ctx.request.query

    const result = await this.ctx.model[model].find({
      _id: id,
    })

    if (result.length > 0) {

      const updateResult = await this.ctx.model[model].updateOne({
        _id: id,
      }, {
        [attr]: Number(result[0][attr]) === 1 ? 0 : 1,
      })

      if (updateResult) {

        this.ctx.body = {
          message: '更新成功',
          success: true,
        }
      } else {

        this.ctx.body = {
          message: '更新失败，参数错误',
          success: false,
        }
      }
    } else {

      this.ctx.body = {
        message: '更新失败，参数错误',
        success: false,
      }
    }
  }

}

module.exports = BaseController;