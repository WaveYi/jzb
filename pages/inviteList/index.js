// pages/inviteList/index.js
import {
  query_agent_invite,
  agent_invite_manage
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    inviteList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInviteList();
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
  getInviteList(){
    query_agent_invite({
      pageNum: this.data.page,
      pageSize: 10
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            inviteList: res.data.records
          })
        }else{
          this.setData({
            inviteList: this.data.inviteList.concat(res.data.records)
          })
        }
      }
    })
  },
  clickAgree(e){
    agent_invite_manage({
      bossId: e.currentTarget.dataset.id,
      status: '1'
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '已通过',
          icon: 'none'
        })
        this.setData({
          inviteList: [],
          page: 1
        })
        this.query_agent_invite();
      }
    })
  },
  clickReject(e){
    agent_invite_manage({
      bossId: e.currentTarget.dataset.id,
      status: '2'
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '已拒绝',
          icon: 'none'
        })
        this.setData({
          inviteList: [],
          page: 1
        })
        this.query_agent_invite();
      }
    })
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
    this.getInviteList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})