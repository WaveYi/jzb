// pages/memberList/index.js
import {
  getCurrentUserBossId,
  companyMemberList
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    status: 1,
    boss_id: '',
    tab_list: ["申请","有效"],
    activeIndex: 0,
    member_lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("----用户信息----"+JSON.stringify(wx.getStorageSync('userInfo')))
    this.getBossId();
  },
  getBossId(){
    getCurrentUserBossId().then((res)=>{
      if(res.code == 200){
        this.setData({
          boss_id: res.data
        })
        this.getMemberList();
      }
    })
  },
  getMemberList(){
    companyMemberList({
      bossId: this.data.boss_id,
      start: this.data.page,
      limit: 20,
      status: this.data.status
    }).then((res)=>{
      console.log(JSON.stringify(res))
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            member_lists: res.data
          })
        }else{
          this.setData({
            member_lists: this.data.member_lists.concat(res.data)
          })
        }
      }
    })
  },
  clickNav(){
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      page: 1
    })
    this.getMemberList()
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    this.getMemberList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})