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
    this.setData({
      inputValue: e.detail.value
    })
    this.searchFn();
  },

  // 根据输入框中的内容进行搜索
  searchFn() {
    wx.request({
      url: `http://172.16.22.168:8080/WxProgram/findBookListByName?bookName=${this.data.inputValue}&pageIndex=${this.data.pageIndex}`,
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

  // 点击查看书籍详情
  toBookDetail(e) {
    wx.navigateTo({
      url: `/pages/book-detail/book-detail?book_name=${e.currentTarget.dataset.bookName}`,
    })
  },

})