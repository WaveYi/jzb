// pages/huiyibang/farm/index.js
import {
  querySellSuccessCouponImgList
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {
      pageNum: this.data.page,
      pageSize: 5,
      couponType: 0,
      accept: 1,
      consumerId: wx.getStorageSync('userInfo').unionId
    }
    querySellSuccessCouponImgList(data).then((res)=>{
      if(res.code == 200){
        // 已购
        if(res.data!=null){
          this.setData({
            couponList: res.data
          })
        }
      }
    })
  },
  clickDetail(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/couponDetail/index?type=buy&src='+this.data.couponList[index].imageNum+'&id='+this.data.couponList[index].idKey
    })
  },
  clickLogistics(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/farmLogistics/index?id='+item.coupon_id+'&coupon_name='+item.coupon_name
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