'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1534304805936_5738';


  config.uploadDir='app/public/admin/upload';

  config.session={
    key:'SESSION_ID',
    maxAge:8640000,
    httpOnly: true,
    encrypt: true,
    renew: true //  延长会话有效期       
  }
  

  // add your config here
  config.middleware = ['adminauth'];

  config.adminauth={
    match: '/admin',
  }


  //多模板引擎配置
  config.view = {
    mapping: {
      '.html': 'ejs'
      // '.nj': 'nunjucks'
    },
  };


  // config.multipart= {
  //   whitelist: [ '.png' ], // 覆盖整个白名单，只允许上传 '.png' 格式
  // }


  //配置mongose连接mongodb数据库

  exports.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/eggxiaomi',
      options: {
        useNewUrlParser: true,
      },
      
    }
  };


  //redis数据库连接地址
  config.redis = {
    client: {
      port: 6379,          // Redis port
      host: '127.0.0.1',   // Redis host
      password: '',
      db: 0
    }
  }

  //配置表单数量
  exports.multipart = {
     fields: '50'
  };


  exports.security = {
    csrf: {
        // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
        ignore: ctx => {
          if(ctx.request.url=='/admin/goods/goodsUploadImage' || ctx.request.url=='/admin/goods/goodsUploadPhoto'){
            return true;
          }
          return false;
        }      
      }
    }


    //定义缩略图的尺寸
    exports.jimpSize =[

      {
        width:180,
        height:180
      },{

        width:400,
        height:400
      }
      
    ]


  
  return config;
};
