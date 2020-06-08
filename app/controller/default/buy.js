'use strict';

const Controller = require('egg').Controller;

class BuyController extends Controller {

  // 去结算
  async checkout() {


    // 获取购物车选中的商品

    const orderList = [];
    let allPrice = 0;
    const cartList = this.service.cookies.get('cartList');


    if (cartList && cartList.length > 0) {

      for (let i = 0; i < cartList.length; i++) {

        if (cartList[i].checked) {
          orderList.push(cartList[i]);

          allPrice += cartList[i].price * cartList[i].num;
        }

      }

      // 获取当前用户的所有收货地址

      const uid = this.ctx.service.cookies.get('userinfo')._id;
      const addressList = await this.ctx.model.Address.find({ uid }).sort({ default_address: -1 });


      await this.ctx.render('default/checkout.html', {
        orderList,
        allPrice,
        addressList,
      });

    } else {
      // 恶意操作
      this.ctx.redirect('/cart');
    }


  }
  // 确认订单  支付
  async confirm() {
    this.ctx.body = 'confirm';
  }
}

module.exports = BuyController;
