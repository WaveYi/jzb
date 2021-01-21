// pages/huiyibang/tableInfo/index.js
import {
  getTableList,
  getUserInfoListByTableId
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    table_id: '',
    show: false,  //显示公司二维码
    list: [],
    table_users: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getTableList({
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          list: res.data
        })
      }
    })
  },
  showPopup(e) {
    let id = e.currentTarget.dataset.id;
    getUserInfoListByTableId({
      tableId: id
    }).then((res)=>{
      if(res.code == 200){
        let list = res.data;
        for(let i in list){
          list[i].phone = list[i].phone.substr(0,3)+"****"+list[i].phone.substr(7);
        }
        this.setData({
          table_users: list
        })
      }
    })
    this.setData({ 
      table_id: id,
      show: true
    });
  },
  onClose() {
    this.setData({ show: false });
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