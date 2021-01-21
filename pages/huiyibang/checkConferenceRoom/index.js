// pages/huiyibang/checkConferenceRoom/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList:[
      {
        name: '查看角色申请',
        url: '/pages/huiyibang/roleList/index?type=1'
      },
      // {
      //   name: '查看桌子与用户',
      //   url: '/pages/huiyibang/tableInfo/index'
      // },
      // {
      //   name: '查看投票列表',
      //   url: '/pages/huiyibang/voteList/index'
      // },
      // {
      //   name: '查看中奖列表',
      //   url: '/pages/huiyibang/winner/index'
      // },
      // {
      //   name:'会议进程观察窗口',
      //   url:'/pages/huiyibang/checkConferenceRoomList/progressCheck/progressCheck'
      // },
      // {
      //   name:'会议收益观察窗口'
      // },
      // {
      //   name:'会议组织观察窗口',
      //   url:'/pages/huiyibang/checkConferenceRoomList/guestCheck/index'
      // },
      // {
      //   name:'会议效率观察窗口'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  pageTo(e){
    console.log("here")
    let url = e.target.dataset.url;
    console.log(url)
    wx.navigateTo({
      url: url,
    })
  }
})