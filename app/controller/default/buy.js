'use strict';

const Controller = require('egg').Controller;

class BuyController extends Controller {

 //去结算
  async checkout() {


    // 获取购物车选中的商品

    var orderList=[];
    var allPrice=0;
    var cartList= this.service.cookies.get('cartList');


    if(cartList && cartList.length>0){

      for(var i=0;i<cartList.length;i++){

         if(cartList[i].checked){
              orderList.push(cartList[i]);

              allPrice+=cartList[i].price*cartList[i].num;
         }

      }

      await this.ctx.render('default/checkout.html',{

        orderList:orderList,
        allPrice:allPrice
      });

    }else{
      //恶意操作
      this.ctx.redirect('/cart')
    }



  }  
  //确认订单  支付
  async confirm(){    
    this.ctx.body='confirm';
  }
}

module.exports = BuyController;
