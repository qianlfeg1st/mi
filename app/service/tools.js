'use strict';

// https://www.npmjs.com/package/svg-captcha

var svgCaptcha = require('svg-captcha'); //引入验证

var md5 = require('md5');

var sd = require('silly-datetime');


var path=require('path');

const mkdirp = require('mz-modules/mkdirp');

const Jimp = require("jimp");  //生成缩略图的模块


const Service = require('egg').Service;

class ToolsService extends Service {

  //生成验证码
  async captcha (width,height){    

    width=width?width:100;

    height=height?height:32;
    var captcha = svgCaptcha.create({ 
        size:4,
        fontSize: 50, 
        width: width, 
        height:height,
        background:"#cc9966" 
      });   

    return captcha;
  }
  async md5(str){

    return md5(str);
  }
  async getTime(){

    var d=new Date();

    return d.getTime();

  }
  async getDay(){


    var day=sd.format(new Date(), 'YYYYMMDD');

    return day;
  }

  async  getUploadFile(filename){

    // 1、获取当前日期     20180920
   
      var day=sd.format(new Date(), 'YYYYMMDD');
  
    //2、创建图片保存的路径

      var dir=path.join(this.config.uploadDir,day);

      await mkdirp(dir);

      var d=await this.getTime();   /*毫秒数*/


      //返回图片保存的路径

      var uploadDir=path.join(dir,d+path.extname(filename));


      // app\public\admin\upload\20180914\1536895331444.png
      return {
        uploadDir:uploadDir,
        saveDir:uploadDir.slice(3).replace(/\\/g,'/')
      }




  }
  //生成缩略图的公共方法
  async jimpImg(target){
     //上传图片成功以后生成缩略图
     Jimp.read(target, (err, lenna) => {
         if (err) throw err;  		

            for(var i=0;i<this.config.jimpSize.length;i++){
              var w=this.config.jimpSize[i].width;
              var h=this.config.jimpSize[i].height;
              lenna.resize(w, h) // resize
                  .quality(90) // set JPEG quality                  
                  .write(target+'_'+w+'x'+h+path.extname(target)); 

          }
     
      });


  }

  
  async getRandomNum(){
      var random_str='';
      for(var i=0;i<4;i++){
          random_str+= Math.floor(Math.random()*10);
      }
      return random_str;
  }
 


}

module.exports = ToolsService;
