Page({
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    console.log(e.detail);
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  scanFn() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
        wx.request({
          url: res.result,
          method: 'GET',
          header: {
            'content-type': 'application/jaon'
          },
          success: (res) => {
            console.log(res);
          }
        })
      },
      fail: (err) => {
        console.log(err)
      }
    })
  }
})