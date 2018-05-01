//app.js
App({
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        console.log('login',res)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

  },
  globalData: {
    userInfo: {},
  }
})

/* 20171226
  1.wx.login
    调用该接口 获取 登录凭证(code)   但是调用该接口会引起登录态的刷新，之前的sessionKey可能会失效
    进而换取 用户 登录态信息 包括 用户的唯一标识(openid) 及 本次登录的会话密钥(session_key)
    用户数据的加密解密通讯需要依赖会话密钥完成
    success: function ( errMsg, code){
      //errMsg: 调用该接口的结果
      //code: 用户登录的凭证(有效期5分钟) 开发者需要在开发服务器后台调用api，使用code换取openid和session_key等信息
    }

  2.wx.getSetting
    获取用户的当前设置  获取当前用户的授权状态
    返回值中只会出现小程序已经向用户请求过的权限,只要向用户请求过允许和拒绝的都会返回
    success: function (res){
      res.authSetting = {
        "scope.userInfo": true, 用户信息 wx.getUserInfo
        "scope.uesrLocation": true,  地理位置 wx.getLocation wx.chooseLocation
        "scope.address": true,  通讯地址 wx.chooseAddress
        "scope.invoiceTitlt": true,  发票抬头 wx.chooseInvoiceTitle
        "scope.werun": true,  微信运动步数 wx.getWeRunData
        "scope.record": true,  录音功能 wx.startRecode
        "scope.writePhotosAlbum": true  保存到相册 wx.saveImageTophotosAlbum,wx.saveVideoToPhotosAlbum
        "scope.camera": true  摄像头
      }
    }
    开发者在调用需要授权的api时 可以使用wx.authroize接口，提前向用户发起请求
    当开发者使用了需要授权的接口 但是用户没有授权的时候 可以调用wx.openSetting接口来引导用户开启授权

  3.wx.authorize
  提前向用户发起请求 调用后会立刻弹窗询问用户是否允许小程序使用某项功能或者获取用户的某些数据，但不会实际调用对应的接口，如果用户之前已经同意授权，则不会出现弹窗，直接返回成功
  wx.authorize({
    scope: '',
    success: function(){},
    fail: function(){},
    complete: function(){}
  })

  4.wx.getSystemInfo(异步)  wx.getSystemInfoSync(同步)
  获取系统信息
  wx.getSystemInfo({
    success: function(res){
      res.brand 手机品牌
      res.model 手机型号
      res.pixel 设备像素比
      res.screenWidth 屏幕宽度
      res.screenHeight 屏幕高度
      res.windowWidth 可使用窗口的宽度
      res.windowHeight 可使用窗口的高度
      res.language 微信设置的语言
      res.version 微信版本号
      res.system 操作系统版本
      res.platform 客户端平台
      res.fontSizeSetting 用户字体大小设置
      res.SDKVersion 客户端基础库版本
    },
    fail: function(err){},
    complete: function(){}
  })

  5.运行机制
    小程序启动有两种情况：
      冷启动：用户首次打开小程序或者小程序被微信主动销毁后在此打开的情况，此时小程序需要重新加载启动
      热启动：假如用户已经打开过某小程序，然后再在一定的时间内再次打开该小程序，此时无需重新启动，只需要将后台态的小程序切换到前台

      小程序中没有重启的概念
      当小程序进入后台，客户端会维持一段时间的运行状态，超过一定的时间后(目前时5分钟)会被微信主动销毁
      置顶的小程序不会被微信主动销毁
      当收到系统内存警告时也会进行小程序的销毁

    更新机制：
      当小程序冷启动时会检查是否有新版本，如果有就会下载新版本的代码包，但是这次冷启动还是会使用上次的代码包进行启动，当下次进行小程序的冷启动的时候才会应用新的代码包

    小程序发版，客户端先用之前的包打开，异步更新好。下次重新打开才使用新包。7天之内不使用的小程序会被强制的更新一次

  6.现在获取用户信息不能再使用wx.getUserInfo接口 要是用button按钮 让用户拥有主动权去选择要不要暴露自己的私人信息 也防止开发者在用户一进入的时候就要获取用户信息，如果用户不同意则不能使用该小程序，这种体验非常的不好
*/