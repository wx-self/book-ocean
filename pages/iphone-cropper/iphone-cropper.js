Page({

  data: {
    imageSrc:'',
    src:''
  },

  onLoad: function (options) {
    var self = this;
    self.setData({
      imageSrc:options.imageSrc
    })
    console.log(options.imageSrc)
    //将图片写入画布
    var myCanvas = wx.createCanvasContext("myCanvas");
    myCanvas.drawImage(self.data.imageSrc, 0, 0, '200', '200');
    myCanvas.draw();
  },
  cropperEvent: function () {//截图事件
    var that = this;
    wx.canvasToTempFilePath({
      x: 0,//画布x轴起点
      y: 0,
      width: '50',//画布宽度
      height: '50',
      destWidth: '100',//输出图片的宽度
      destHeight: '100',
      canvasId: 'myCanvas',
      success: function (result) {
        console.log(result);
        console.log(result.tempFilePath);
        that.setData({
          show: false,
          src: result.tempFilePath
        })

        // that.getVIN(that.data.imageSrc);
      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  },
 
})