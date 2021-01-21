// pages/couponUseList/index.js
import {
  query_consumer_user_coupon_list
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_list: ['促销券','代金券'],
    nav_active: 0,
    type: 0,//促销券：0  代金券：1
    page: 1,
    couponList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCouponList(0);
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
  clickNav(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      nav_active: index,
      type: index,
      page: 1
    })
    this.getCouponList(index);
  },
  getCouponList(index){
    query_consumer_user_coupon_list({
      pageNum: this.data.page,
      pageSize: 20,
      // couponType: index
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            couponList: res.data.records
          })
        }else{
          this.setData({
            couponList: this.data.couponList.concat(res.data.records)
          })
        }
      }
    })
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})