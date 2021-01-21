// pages/huiyibang/voteList/index.js
import {
  getVoteListCount,
  queryMenuList,
  statisticsMenuVoteByRoomId
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    vote_list: [],
    compereName: [],//被选举人名称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVoteList();
  },
  getVoteList(){
    statisticsMenuVoteByRoomId({
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        // for(let i in res.data){
        //   res.data[i].compereUserId = this.data.compereName[i].compereName
        // }
        this.setData({
          vote_list: res.data
        })
      }
    })
  },
  getCompereName(){
    queryMenuList({
      roomId: wx.getStorageSync('room_id'),
      type: 2
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          compereName: res.data.records
        })
        setTimeout(()=>{
          this.getVoteList();
        },300)
      }
    })  
  },
  lookDetail(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/voteDetail/index?menu_id='+item.menuId
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