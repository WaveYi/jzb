// pages/huiyibang/Browse/index.js
import {

} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionList:[
      {
        name:'出售成功列表',
        url: '/pages/huiyibang/invition/index'
      },
      // {
      //   name:'签到签退列表',
      //   url: '/pages/huiyibang/signList/index'
      // },
      // {
      //   name:'嘉宾活跃状态',
      //   url: '/pages/huiyibang/activeStatus/index'
      // },
      // {
      //   name: '查看投票列表',
      //   url: '/pages/huiyibang/voteList/index'
      // },
      {
        name: '浏览效率',
        url: '/pages/huiyibang/BrowseList/index'
      },
      // {
      //   name:'品种分布趋势图',
      //   url: '/pages/huiyibang/shipment/index'
      // },
      // {
      //   name:'品种销售报表',
      //   url: '/pages/huiyibang/circleTable/index'
      // },
      // {
      //   name:'促销券类型销量报表',
      //   url: '/pages/huiyibang/voucher/index'
      // },
      // {
      //   name:'场地分布报表',
      //   url: '/pages/huiyibang/columnar/index'
      // },
      // {
      //   name:'查看代金券列表',
      //   url: '/pages/huiyibang/couponList/index'
      // }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  pageTo(e){
    let url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
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