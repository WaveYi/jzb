// pages/huiyibang/signList/index.js
import {
  getsignlist,
  consumeRecordList
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let role_type = wx.getStorageSync('room_role'+wx.getStorageSync('room_id'));
    console.log('---房间身份---'+role_type)
    let data = {
      roomId: wx.getStorageSync('room_id'),
      type: 0
    }
    if(role_type == 0){
      data.userId = wx.getStorageSync('userInfo').unionId
    }
    consumeRecordList(data).then((res)=>{
      if(res.code == 200){
        this.setData({
          list: res.data
        })
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