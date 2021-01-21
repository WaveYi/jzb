// pages/recordList/index.js
import {
  member_handle_record,
  coupon_handle_record
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    nav_list: ['成员管理','促销券管理'],
    nav_active: 0,
    memberList: [],
    couponList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMemberRecord();
    this.getCouponRecord();
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
  getMemberRecord(){
    member_handle_record({
      pageNum: this.data.page,
      pageSize: 20
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          memberList: res.data.records
        })
      }
    })
  },
  getCouponRecord(){
    coupon_handle_record({
      pageNum: this.data.page,
      pageSize: 20
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          couponList: res.data.records
        })
      }
    })
  },
  clickNav(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      nav_active: index,
      page: 1
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})