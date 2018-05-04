import host from '../../utils/services.js';

Page({

  data: {
    inputValue: '',//搜索框中的内容
    searchRecordLists: [
      { name: '解忧杂货店' },
      { name: '白夜行' },
      { name: '大秦帝国' },
      { name: '万历十五年' },
      { name: '红楼梦' },
      { name: '深入理解java虚拟机' },
      { name: '推荐系统实战' },
    ],//搜索记录列表
    searchResult: [],//搜索结果列表
    pageIndex: 1,
  },

  onLoad: function (options) {},

  onShow() {
    this.setData({
      inputValue: '',
    })
  },

  onReachBottom() {
    this.searchFn();
  },
  
  // 输入框输入事件
  inputFn(e) {
    // 输入框中的内容每次变动都要给pageIndex和searchResult重新赋值
    this.setData({
      inputValue: e.detail.value,
      pageIndex: 1,
      searchResult: [],
    })
    this.searchFn();
  },

  // 根据输入框中的内容进行搜索
  searchFn() {
    wx.request({
      url: host.host + `/WxProgram/findBookListByName`,
      method: 'POST',
      data: {
        bookName: this.data.inputValue,
        pageIndex: this.data.pageIndex
      },
      success: (res) => {
        let searchResult = res.data;
        searchResult.forEach((item, index) => {
          this.data.searchResult.push(item)
        })
        this.setData({
          searchResult: this.data.searchResult,
          pageIndex: this.data.pageIndex + 1,
        })
      },
      fail: (err) => {
        console.log(err);
      }
    })
  },

  // 取消搜索
  cancelFn() {
    this.setData({
      inputValue: '',
    }) 
  },

  // 点击查看书籍详情
  toBookDetail(e) {
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?book_name=${e.currentTarget.dataset.bookName}&book_id=${e.currentTarget.dataset.bookId}`,
    })
  },

})