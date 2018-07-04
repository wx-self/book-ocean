import host from '../../utils/services.js';

let app = getApp();

Page({
  data: {
    userInfo: {},//存放的是用户的个人信息
    showUserInfoBtn: true,//是否显示获取用户信息的button
    bookLists: [],//用户收藏的书籍列表
    isEdit: false,
  },

  onLoad(options) {
    
  },

  onShow() {
    if (JSON.stringify(app.globalData.userInfo) !== '{}'){//全局下的userInfo不为空则显示用户信息
      this.setData({
        userInfo: app.globalData.userInfo,
        showUserInfoBtn: false,
      })
      this.getCollectionListFn();
    }else{//为空则显示获取信息的button
      this.setData({
        userInfo: {},
        showUserInfoBtn: true,
      })
    }
  },

  // 获取用户信息
  getUserInfoFn(e) {
    if(JSON.stringify(e.detail.userInfo) !== '{}'){
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        showUserInfoBtn: false,
      })
      this.getCollectionListFn();
    }
  },

  // 获取该用户下的收藏的图书列表
  getCollectionListFn() {
    wx.request({
      url: host.host + `/WxProgram/getBookByUser`,
      method: 'POST',
      data: {
        nick: this.data.userInfo.nickName,
      },
      success: (res) => {
        console.log(res);
        this.setData({
          bookLists: res.data,
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  // 查看书籍详情
  toBookDetailFn(e) {
    if (!this.data.isEdit){
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?book_name=${e.currentTarget.dataset.bookName}&book_id=${e.currentTarget.dataset.bookId}`,
      })
    }else{
      let bookLists = this.data.bookLists;
      bookLists.forEach((item,index) => {
        if (item.id === e.currentTarget.dataset.bookId){
          if (item.selected){
            item.selected = false;
          }else{
            item.selected = true;
          }
        }
      })
      this.setData({
        bookLists
      })
    }
    
  },

  deleteCollectBookFn() {
    let bookIds = '';
    this.data.bookLists.forEach((item, index) => {
      if (item.selected) {
        bookIds = bookIds + item.id + ',';
      }
    })
    wx.request({
      url: host.host + `/WxProgram/deleteBookById`,
      method: 'POST',
      data: {
        nick: this.data.userInfo.nickName,
        bookIds: bookIds
      },
      success: (res) => {
        console.log(res);
        this.getCollectionListFn();
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  editFn() {
    this.setData({
      isEdit: !this.data.isEdit
    })
  },
})