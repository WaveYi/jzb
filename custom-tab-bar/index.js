Component({
  data: {
    selected: 0,
    color: "#707070",
    selectedColor: "#1296db",
    list: [{
      "pagePath": "/pages/index/index",
      "text": "扫码"
    },{
      "pagePath": "/pages/qinqinhehe/promotion/index",
      "text": "公司"
    },{
      "pagePath": "/pages/huiyibang/houseList/index",
      "text": "农场"
    },{
      "pagePath": "/pages/userInfo/index",
      "text": "我的"
    }]
  },
  attached() {
    // let list = [{
    //   "pagePath": "/pages/index/index",
    //   "text": "扫码"
    // },{
    //   "pagePath": "/pages/qinqinhehe/promotion/index",
    //   "text": "公司"
    // },{
    //   "pagePath": "/pages/huiyibang/houseList/index",
    //   "text": "农场"
    // },{
    //   "pagePath": "/pages/userInfo/index",
    //   "text": "我的"
    // }]
    // this.setData({
    //   list: list
    // })
  },
  created() {
    
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      this.setData({
        selected: data.index
      })
      wx.switchTab({url})
    }
  }
})