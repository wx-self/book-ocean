Page({

  data: {
    className: '',
    tag: '',
    pageIndex: 1,//下次获取第几页的数据
    bookList: [],
  },

  onLoad: function (options) {
    this.setData({
      className: options.className,
      tag: options.tag,
    })
    this.getBookListFn();
  },

  onReachBottom() {
    this.getBookListFn();
  },

  // 获取书籍列表
  getBookListFn() {
    console.log('getBookListFn');
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: `http://172.16.22.168:8080/WxProgram/findAllBookByTag?tag=${this.data.tag}&pageIndex=${this.data.pageIndex}`,
      success: (res) => {
        wx.hideLoading();
        console.log('success',res.data);
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
    console.log(e.currentTarget.dataset.bookName)
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?book_name=${e.currentTarget.dataset.bookName}&book_id=${e.currentTarget.dataset.bookId}`,
    })
  },
})