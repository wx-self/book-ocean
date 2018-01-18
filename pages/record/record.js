//获取应用实例 
var app = getApp()
Page({
  data: {
    j: 1,//帧动画初始图片 
    isSpeaking: false,//是否正在说话 
    voices: [],//音频数组 
  },
  onLoad: function () {
    // 用户要使用录音功能的话 首先要经过用户的录音的授权  只有用户对录音功能进行授权之后小程序才能进行真正的录音功能的使用
    wx.getSetting({
      success: (res) => {
        // 获取用户对权限的设置  获取回来的结果都是小程序向用户请求过的权限
        // scope.record录音权限
      }
    })
  },
  //手指按下 
  touchdown: function () {
    console.log("手指按下了...")
    console.log("new date : " + new Date)
    var _this = this;
    speaking.call(this);
    this.setData({
      isSpeaking: true
    })
    //开始录音 此借口在1.7.0的版本中已经不维护了  可以使用更高级的接口（wx.getRecorderManager） 该接口获取的是全局中唯一一个录音设备  返回的是一个recordManager对象
    wx.startRecord({
      success: function (res) {
        //临时路径,下次进入小程序时无法正常使用  录音成功之后返回的是录音文件的临时的路径 和拍照识别返回的是照片的临时路径是一样的
        var tempFilePath = res.tempFilePath
        console.log("tempFilePath: " + tempFilePath)
        //持久保存 可以将该临时文件进行永久的保存
        wx.saveFile({
          tempFilePath: tempFilePath,
          success: function (res) {
            //持久路径 
            //本地文件存储的大小限制为 100M 
            var savedFilePath = res.savedFilePath
            console.log("savedFilePath: " + savedFilePath)
          }
        })
        // 因为小程序中保存的临时文件的最大为100M 所以要注意将临时文件及时的转为永久的文件  以防临时文件的丢失
        wx.showToast({
          title: '恭喜!录音成功',
          icon: 'success',
          duration: 1000
        })
        //获取录音音频列表  获取录音音频文件的列表
        wx.getSavedFileList({
          success: function (res) {
            console.log(res);
            var voices = [];
            for (var i = 0; i < res.fileList.length; i++) {
              //格式化时间 
              var createTime = new Date(res.fileList[i].createTime)
              //将音频大小B转为KB 
              var size = (res.fileList[i].size / 1024).toFixed(2);
              var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };
              voices = voices.concat(voice);
            }
            _this.setData({
              voices: voices
            })
          }
        })
      },
      // 改接口是录音失败要经过的接口
      fail: function (res) {
        //录音失败 
        wx.showModal({
          title: '提示',
          content: '录音的姿势不对!',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              return
            }
          }
        })
      }
    })
  },
  //手指抬起 
  touchup: function () {
    console.log("手指抬起了...")
    this.setData({
      isSpeaking: false,
    })
    clearInterval(this.timer)
    wx.stopRecord()
  },
  //点击播放录音 
  gotoPlay: function (e) {
    var filePath = e.currentTarget.dataset.key;
    //点击开始播放 
    wx.showToast({
      title: '开始播放',
      icon: 'success',
      duration: 1000
    })
    wx.playVoice({
      filePath: filePath,
      success: function () {
        wx.showToast({
          title: '播放结束',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }
})
//麦克风帧动画 
function speaking() {
  var _this = this;
  //话筒帧动画 
  var i = 1;
  this.timer = setInterval(function () {
    i++;
    i = i % 5;
    _this.setData({
      j: i
    })
  }, 200);
}