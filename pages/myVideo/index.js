import {
  qrCodeList
} from '../../api/qrCode.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {
      'current': 1,
      'size': 10
    },
    dataList: [],
    page: 1,
    pages: 1
  },

  onShow(options) {
    this.setData({
      dataList: []
    })
    this.firstList()
  },
  firstList() {
    return new Promise((resolve, reject) => {
      qrCodeList({
        current: this.data.page,
        size: 10
      }).then(res => {
        if(res.code == 200){
          let newList = this.data.dataList;
          newList.push(...res.data.records)
          this.setData({
            dataList: newList,
            pages: res.data.pages
          })
          resolve()
        }
      }).catch(err => {
        resolve()
      })
    })
  },
  toChangeVideo(e) {
    let row = e.currentTarget.dataset.row;
    let newData = {
      codeId: row.codeId,
      name: row.name
      // number: row.number
    }
    wx.navigateTo({
      url: '/pages/changeVideo/index?' + wx.formatParmas(newData)
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    this.setData({
      dataList: []
    })
    this.firstList().then(() => {
      // 隐藏导航栏加载框
      wx.hideNavigationBarLoading();
      // 停止下拉动作
      wx.stopPullDownRefresh();
    })

  },
  //到底加载
  onReachBottom() {
    if (this.data.query['page.current'] < this.data.pages) {
      this.setData({
        query: {
          'page.current': this.data.query['page.current'] + 1,
          'page.size': 10
        }
      })
      this.firstList();
    }
  }
})