import host from '../../utils/services.js';
console.log(host.host)

Page({

  data: {
    pageType: 'class',//class:表示的是当前书的类别  tag:表示的是一个类别下的tag
    allClass: [
      { classId: 1, className: '文学'},
      { classId: 2, className: '流行'},
      { classId: 3, className: '文化'},
      { classId: 4, className: '生活'},
      { classId: 5, className: '经管'},
      { classId: 6, className: '科技'},
    ],
    tagList: [],//一个类别下的所有的tag
    className: '',//选择的类别
  },

  onLoad(options) {
    
  },

  onShow() {
    this.setData({
      pageType: 'class',
    })
  },

  // 选择书的类别
  selectBookClassFn(e) {
    wx.request({
      url: host.host + `/WxProgram/findAllTagByClass?classId=${e.currentTarget.dataset.id}`,
      success: (res) => {
        console.log('success',res.data);
        this.setData({
          tagList: res.data,
          pageType: 'tag',
          className: e.currentTarget.dataset.className
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  // 选择tag
  selectBookTagFn(e) {
    wx.navigateTo({
      url: `/pages/book-list/book-list?className=${this.data.className}&tag=${e.currentTarget.dataset.tag}&tagId=${e.currentTarget.dataset.tagId}`,
    })
  },

  goBackClassFn() {
    this.setData({
      pageType: 'class',
    })
  },

})