// pages/toChangeVideo/index.js
import {
  weseeAnalysis
} from '../../api/qrCode.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.videoPlay(wx.decodeUnicode(options.url))
  },
  videoPlay(url) {
    weseeAnalysis([url]).then(res => {
      this.setData({
        url: res.data[0].videoLink
      })
    })
  }
})