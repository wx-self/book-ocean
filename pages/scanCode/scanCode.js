// pages/scanCode/scanCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  scanCodeEvent1:function(){//二维码
    var self = this;
    wx.scanCode({
      onlyFromCamera: true,//是否只能来自相机，不允许从相册中选择
      scanType: 'qrCode',
      success: function(res){
        self.setData({
          result:res
        })
        console.log(res);
      },
      fail: function(err){
        self.setData({
          result: err
        })
        console.log(err)
      }
    })
  },
  scanCodeEvent2: function () {//条形码
    var self = this;
    wx.scanCode({
      onlyFromCamera: true,//是否只能来自相机，不允许从相册中选择
      scanType: 'barCode',
      success: function (res) {
        self.setData({
          result: res
        })
        console.log(res);
      },
      fail: function (err) {
        self.setData({
          result: err
        })
        console.log(err)
      }
    })
  }
})