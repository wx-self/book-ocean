import host from '../../utils/services.js';

Page({

  data: {
    className: '',
    tag: '',
    tagId: '',
    pageIndex: 1,//下次获取第几页的数据
    bookList: [],
  },

  onLoad: function (options) {
    this.setData({
      className: options.className,
      tag: options.tag,
      tagId: options.tagId,
    })
    this.getBookListFn();
  },

  onReachBottom() {
    this.getBookListFn();
  },

  // 获取书籍列表
  getBookListFn() {
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: host.host + `/WxProgram/findAllBookByTag?tagId=${this.data.tagId}&pageIndex=${this.data.pageIndex}`,
      success: (res) => {
        wx.hideLoading();
        let bookList = res.data;
        bookList.forEach((item,index) => {
          this.data.bookList.push(item)
        })
        this.setData({
          bookList: this.data.bookList,
          pageIndex: this.data.pageIndex + 1,
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  // 
  toBookDetailFn(e) {
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?book_name=${e.currentTarget.dataset.bookName}&book_id=${e.currentTarget.dataset.bookId}`,
    })
  },
})