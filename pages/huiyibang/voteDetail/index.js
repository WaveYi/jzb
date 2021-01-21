// pages/huiyibang/voteDetail/index.js
import {
  getVoteList,
  queryUserVoteDetailByMenuId
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    menu_id: '',
    vote_list: [],
    compereUserId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.menu_id){
      this.setData({
        menu_id: options.menu_id
      })
    }
    if(options.compereName){
      this.setData({
        compereUserId: options.compereName
      })
    }
    this.getVoteList();
  },
  getVoteList(){
    queryUserVoteDetailByMenuId({
      roomId: wx.getStorageSync('room_id'),
      menuId: this.data.menu_id
    }).then((res)=>{
      if(res.code == 200){
        if(res.data!=null && res.data.length != 0){
          let voteList = res.data;
          for(let i in voteList){
            voteList[i].phone = voteList[i].phone.substr(0,3)+"****"+voteList[i].phone.substr(7);
          }
          this.setData({
            vote_list: voteList
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