// pages/huiyibang/table/index.js
import {
  getTableList,
  getUserToTable,
  deleteTable
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    table_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getTableList(){
    getTableList({
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          table_list: res.data
        })
      }
    })
  },
  toCreate(){
    wx.navigateTo({
      url: '/pages/huiyibang/addTable/index'
    })
  },
  changeTable(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/addTable/index?item='+encodeURIComponent(JSON.stringify(item))
    })
  },
  deleteTable(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "确定删除吗？",
      success: function(mos){
        if(mos.confirm){
          deleteTable({
            id: id
          }).then((res)=>{
            if(res.code == 200){
              that.getTableList();
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
    this.getTableList();
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