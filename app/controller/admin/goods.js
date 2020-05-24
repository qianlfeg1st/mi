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

        //获取商品分类

        var goodsCate=await this.ctx.model.GoodsCate.aggregate([
        
          {
            $lookup:{
              from:'goods_cate',
              localField:'_id',
              foreignField:'pid',
              as:'items'      
            }      
         },
         {
            $match:{
              "pid":'0'
            }
         }
      
      ])


      
        await this.ctx.render('admin/goods/add',{

          colorResult:colorResult,
          goodsType:goodsType,
          goodsCate:goodsCate
        });
        
      }     

      async doAdd() {
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
    


          var formFields=Object.assign(files,parts.field);


          console.log(formFields);

          //增加商品信息
          let goodsRes =new this.ctx.model.Goods(formFields);    
          var result=await goodsRes.save();
    
          // console.log(result._id);
          //增加图库信息
          if(result._id){           
            var  goods_image_list=formFields.goods_image_list;
           
           
            for(var i=0;i<goods_image_list.length;i++){                     
                  let goodsImageRes =new this.ctx.model.GoodsImage({
                    goods_id:result._id,
                    img_url:goods_image_list[i]
                  });
            
                  await goodsImageRes.save();
            }

          }
          //增加商品类型数据

          if(result._id){           

            /*
            attr_id_list:
            [ '5bbac2f646f01a08f4a82e7c',
              '5bbd7ea7e723b71e5815b7dd',
              '5bbd7eb0e723b71e5815b7de',
              '5bbd805ee723b71e5815b7df' ],
            attr_value_list: [ 'windows', '8g', '1t', '1440*720\r\n' ] }
            */


            var attr_value_list=formFields.attr_value_list;
            var attr_id_list=formFields.attr_id_list;

            for(var i=0;i<attr_value_list.length;i++){
                //查询goods_type_attribute
                if(attr_value_list[i]){ 
                    var goodsTypeAttributeResutl=await this.ctx.model.GoodsTypeAttribute.find({"_id":attr_id_list[i]})

                    let goodsAttrRes =new this.ctx.model.GoodsAttr({
                      goods_id:result._id, 
                      cate_id:formFields.cate_id,
                      attribute_id:attr_id_list[i],
                      attribute_type:goodsTypeAttributeResutl[0].attr_type,
                      attribute_title:goodsTypeAttributeResutl[0].title,
                      attribute_value:attr_value_list[i]
                    });

                    await goodsAttrRes.save();
                }
            }

            

          }





          await this.success('/admin/goods','增加商品数据成功');
        
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

      //上传商品详情的图片
       async goodsUploadImage() {
        
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

     //上传相册的图片
      async goodsUploadPhoto() {
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

              //生成缩略图
              this.service.tools.jimpImg(target);
              
          }      

        
          //图片的地址转化成 {link: 'path/to/image.jpg'} 

          this.ctx.body={link: files.file};
            
        
      } 

      
}

module.exports = GoodsController;
