// pages/huiyibang/myInvitationCard/index.js
import {
  buy_coupon,
  sellaccept
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    card_img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    buy_coupon({
      roomId: wx.getStorageSync('room_id'),
      certId: ''
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          id: res.data.idKey
        })
      }
    })
  },
  agreeInvitation(){
    sellaccept({
      accept: 1,
      idKey: this.data.id
    }).then((res)=>{
      if(res.code == 200){

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