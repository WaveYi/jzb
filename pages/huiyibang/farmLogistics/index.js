// pages/huiyibang/farmLogistics/index.js
import {
  getLogisticsRecordList
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon_name: '',
    couponList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.coupon_name){
      this.setData({
        coupon_name: options.coupon_name
      })
    }
    let data = {}
    if(options.code_id){
      data.couponId = options.code_id
    }
    getLogisticsRecordList(data).then((res)=>{
      console.log('---物流信息---'+JSON.stringify(res))
      if(res.code == 200){
        if(res.data!=null){
          this.setData({
            couponList: res.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})