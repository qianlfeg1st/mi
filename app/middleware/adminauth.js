const url = require('url')

module.exports = options => {

  return async function adminauth(ctx, next) {

    const pathname = url.parse(ctx.request.url).pathname
    ctx.state.csrf = ctx.csrf

    if (ctx.session.userinfo) {

      ctx.state.userinfo = ctx.session.userinfo

      await next()
    } else {

      if (['/admin/login', '/admin/doLogin', '/admin/verify'].includes(pathname)) {

        await next()
      } else {

        ctx.redirect('/admin/login')
      }
    }
  };
};