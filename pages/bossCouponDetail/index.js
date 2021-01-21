// pages/bossCouponDetail/index.js
import {
  query_coupon_info,
  addCouponAgent,
  addAgentCoupon
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponInfo: {},
    coupon_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      let data = {
        couponId: options.id
      }
      query_coupon_info(data).then((res)=>{
        if(res.code == 200){
          this.setData({
            coupon_id: options.id,
            couponInfo: res.data
          })
        }
      })
    }
  },
  toBossApply(){
    addAgentCoupon({
      couponId: this.data.coupon_id,
      type: 0,
      agentId: wx.getStorageSync('userInfo').unionId
    }).then(ress=>{
      if(ress.code == 200){
        wx.showToast({
          title: "发行成功",
          icon: 'none',
          duration: 1500
        })
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1500)
      }
    })
  },
  back(){
    wx.navigateBack({
      delta: 1
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