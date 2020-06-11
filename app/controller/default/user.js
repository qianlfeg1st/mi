'use strict';

const Controller = require('egg').Controller;

class UserController extends Controller {
 
  async welcome() {   
    await this.ctx.render('default/user/welcome.html');
  }

  async order() {    
    const uid = this.ctx.service.cookies.get('userinfo')._id;
    const page = this.ctx.request.query.page || 1;
    var json={"uid":uid};   //查询当前用户下面的所有订单
    const pageSize = 2;
    // 总数量
    const totalNum = await this.ctx.model.Order.find(json).countDocuments();

   
    //聚合管道要注意顺序

    const result = await this.ctx.model.Order.aggregate([
      {
        $lookup: {
          from: 'order_item',
          localField: '_id',
          foreignField: 'order_id',
          as: 'orderItems',
        },
      },
      {
        $sort: {"add_time":-1}
      },
      {
        $match:{"uid":this.app.mongoose.Types.ObjectId(uid)}    //条件
      },
      {
        $skip: (page - 1) * pageSize,
      },
      {
        $limit: pageSize,
      }     
    ]); 

    await this.ctx.render('default/user/order.html', {
      list: result,
      totalPages: Math.ceil(totalNum / pageSize),
      page,
    });


  }
  
  async orderinfo() {
    // this.ctx.body = '用户订单';
    await this.ctx.render('default/user/order_info.html');
  }


  async address() {
    this.ctx.body = '收货地址';

  }
}

module.exports = UserController;
