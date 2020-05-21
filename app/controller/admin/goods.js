'use strict';

var BaseController =require('./base.js');

const fs=require('fs');
const pump = require('mz-modules/pump');


class GoodsController extends BaseController {
      async index() {       
      
          await this.ctx.render('admin/goods/index');
      }     
    
      async add() {

        //获取所有的颜色值
        var colorResult=await this.ctx.model.GoodsColor.find({});

        //获取所有的商品类型
        var goodsType=await this.ctx.model.GoodsType.find({});

      
        await this.ctx.render('admin/goods/add',{

          colorResult:colorResult,
          goodsType:goodsType
        });
        
      }     

      async doAdd() {

        
        console.log(this.ctx.request.body);
        
      }  


      //获取商品类型的属性 api接口
      async goodsTypeAttribute() {


        var cate_id=this.ctx.request.query.cate_id;

        //注意 await
        var goodsTypeAttribute=await this.ctx.model.GoodsTypeAttribute.find({"cate_id":cate_id})
        
        console.log(goodsTypeAttribute);
        
        this.ctx.body={
          result:goodsTypeAttribute
        }
        
      }  


       async goodsUploadImage() {
        //实现图片上传
        let parts = this.ctx.multipart({ autoFields: true });
          let files = {};               
          let stream;
          while ((stream = await parts()) != null) {
              if (!stream.filename) {          
                break;
              }       
              let fieldname = stream.fieldname;  //file表单的名字

              //上传图片的目录
              let dir=await this.service.tools.getUploadFile(stream.filename);
              let target = dir.uploadDir;
              let writeStream = fs.createWriteStream(target);

              await pump(stream, writeStream);  

              files=Object.assign(files,{
                [fieldname]:dir.saveDir    
              })
              
          }      

          console.log(files);
          
          //图片的地址转化成 {link: 'path/to/image.jpg'} 

          this.ctx.body={link: files.file};
            
        
      }  

      
}

module.exports = GoodsController;
