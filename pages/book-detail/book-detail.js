import host from '../../utils/services.js';

let app = getApp();

Page({

  data: {
    bookName: '',//书籍名称
    bookDetail: {},
    showGetUserInfoBtn: false,//是否显示获取用户信息的btn
    isCollect: false,
  },

  onLoad(options) {
    this.init(options);
  },

  onShow() {
    if (JSON.stringify(app.globalData.userInfo) === '{}'){//全局中并没有用户信息
      this.setData({
        showGetUserInfoBtn: true,
      })
    }else{
      this.setData({
        showGetUserInfoBtn: false,
      })
    }
  },

  // 初始化
  init(options) {
    this.setData({
      bookName: options.book_name ? options.book_name : '',
      bookId: options.book_id ? options.book_id : '',
    })
    wx.setNavigationBarTitle({
      title: this.data.bookName,
    })
    if(options.book_id){
      this.getBookDetailById();
    }else{
      this.getBookDetailFn();
    }
  },

  // 获取书籍详情
  getBookDetailFn() {
    wx.request({
      url: host.host + `/WxProgram/findBookByName?bookName=${this.data.bookName}`,
      success: (res) => {
        this.setData({
          bookDetail: res.data
        })
      },
      fail: (err) => {
        console.log('fail',err);
      }
    })
  },

  // 
  getBookDetailById() {
    wx.request({
      url: host.host + `/WxProgram/findBookByIdIsCollect`,
      method: 'POST',
      data: {
        bookId: this.data.bookId,
        nick: app.globalData.userInfo.nickName,
      },
      success: (res) => {
        this.setData({
          bookDetail: res.data.book,
          isCollect: res.data.collect
        })
      },
      fail: (err) => {
        console.log('fail', err);
      }
    })
  },

  // 收藏事件
  collectFn(e) {
    if (JSON.stringify(app.globalData.userInfo) !== '{}'){
      wx.request({
        url: host.host + `/WxProgram/addUserAndBook`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        data: {
          nick: app.globalData.userInfo.nickName,
          bookId: e.currentTarget.dataset.bookId,
        },
        success: (res) => {
          console.log(res)
          this.setData({
            isCollect: true,
          })
        },
        fail: (err) => {
          console.log(err);
        }
      })
    }else{
      this.getUserInfoFn();
    }
  },

  // 获取用户信息
  getUserInfoFn(e) {
    console.log(e);
    if (JSON.stringify(e.detail.userInfo) !== '{}') {
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: e.detail.userInfo,
        showUserInfoBtn: false,
      })
      this.collectFn(e);
    }
  },


})