import {
  userInfo
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
  },
  onShow(){
    // this.getTabBar().setData({
    //   selected: 0
    // })
  },
  btnclick:function(){
    console.log('123');
  
  },
  scanCode() {
    wx.scanCode({
      success(res) {
        console.log('扫码返回的参数'+res.result);
        let data = wx.getQueryString({
          url: res.result,
          name: "data"
        });
        wx.setStorage({
          data: encodeURIComponent(res.result),
          key: 'params',
        })
        wx.navigateTo({
          url: '/pages/demo/index?data=' + data
        })
      }
    })
  },
  toLogin() {
    wx.navigateTo({
      url: '/pages/login/index'
    })
  },
  toUserInfo() {
    wx.navigateTo({
      url: '/pages/userInfo/index'
    })
  },
  bindGetUserInfo1(){
    wx.navigateTo({
      url: '/pages/consumerPage/index'
    })
  },
  bindGetUserInfo2(){
    wx.navigateTo({
      url: '/pages/factorPage/index'
    })
  },
  bindGetUserInfo3(){
    wx.navigateTo({
      url: '/pages/myFavorite/index'
    })
  },
  bindGetUserInfo4(){
    console.log(1221212112212121)
   
    wx.navigateTo({
      url: '/pages/salesmanPage/index'
    })
  },
  bindGetUserInfo(e) {
    if (e.detail.userInfo) {
      userInfo().then(res => {
        if (res.code == 200) {
          this.toUserInfo();
        } else {
          this.toLogin();
        }
      }).catch(err => {
        this.toLogin();
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '需要通过授权才能继续，请重新授权',
        showCancel: false,
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
    }
  },
})