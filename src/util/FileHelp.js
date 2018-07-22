


class FileHelp {
  constructor() {

  }

  zip(path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onerror = function () {
      alert('图片加载出错')
    }
    img.onload = function () {


      var that = this;
      var w = that.width,
        h = that.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      var quality = 0.7; // 默认图片质量为0.7
      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');

      // 创建属性节点
      var anw = document.createAttribute("width");
      anw.nodeValue = w;
      var anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }

      // quality值越小，所绘制出的图像越模糊
      var base64 = canvas.toDataURL('image/jpeg', quality);

      // 回调函数返回base64的值
      callback(base64);
    }

  }

  zipImage(file,callback) {
    if(!file) return
    var src = URL.createObjectURL(file)

    var bili = 1;



    this.zip(src,{
      width: 100,
      heght: 100,
      quality: bili
    },function(data){
      callback(data)
    })
  }

}


export default new FileHelp()
