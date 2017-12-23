// pages/camera/camera.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  takePhoto () {
    let self = this;
    wx.createCameraContext().takePhoto({
      quality:'high',
      success:function(res){
        console.log(res);
      },
      fail:function(err){
        console.log(err);
      }
    })
  }






})