const url = require('url')

module.exports = options => {

  return async function adminauth(ctx, next) {

    const pathname = url.parse(ctx.request.url).pathname
    ctx.state.csrf = ctx.csrf

    if (ctx.session.userinfo) {

      ctx.state.userinfo = ctx.session.userinfo

      const hasAuth = await ctx.service.admin.checkAuth()

      if (hasAuth) {

        await next()
      } else {

        ctx.body = '您没有权限访问当前地址'
      }
    } else {

      if (['/admin/login', '/admin/doLogin', '/admin/verify'].includes(pathname)) {

        await next()
      } else {

        ctx.redirect('/admin/login')
      }
    }
  };
};