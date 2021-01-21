// pages/huiyibang/winner/index.js
import {
  getWinnerList,
  delWinner
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    winner_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getWinnerList(){
    getWinnerList({
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        let list = res.data;
        for(let i in list){
          list[i].phone = list[i].phone.substr(0,3)+"****"+list[i].phone.substr(7);
        }
        this.setData({
          winner_list: list
        })
      }
    })
  },
  toCreate(){
    wx.navigateTo({
      url: '/pages/huiyibang/addWinner/index'
    })
  },
  changeWinner(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/addWinner/index?item='+encodeURIComponent(JSON.stringify(item))
    })
  },
  deleteWinner(e){
    let id = e.currentTarget.dataset.id;
    let that = this;
    wx.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: function(mos){
        if(mos.confirm){
          delWinner({
            id: id
          }).then((res)=>{
            if(res.code == 200){
              that.getWinnerList();
            }
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
    this.getWinnerList();
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