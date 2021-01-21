// pages/huiyibang/BrowseDetail/index.js
import {
  invitationList,
  queryAgentInviteUserList
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_list: [],
    user_name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_name: wx.getStorageSync('userInfo').nickname
    })
    queryAgentInviteUserList({
      roomId: wx.getStorageSync('room_id'),
      couponId: options.coupon_id,
      sellerId: options.id
    }).then((res)=>{
      if(res.code == 200){
        if(res.data!=null && res.data.length != 0){
          let voteList = res.data;
          for(let i in voteList){
            voteList[i].phone = voteList[i].phone.substr(0,3)+"****"+voteList[i].phone.substr(7);
          }
          this.setData({
            detail_list: voteList
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