import {
  login,
  getUser,
  getSessinKey
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    openID:'',
    longitude:'',
    latitude:'',
    secretKey:'',
    is_auth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(wx.getStorageSync('is_auth')){
      this.setData({
        is_auth: wx.getStorageSync('is_auth')
      })
    }
  },
  getUserInfoFun(e){
    console.log(e)
    if(e.detail.errMsg == "getPhoneNumber:ok"){
      wx.login({
        success: (resg) => {
          if (resg.code) {
            console.log(resg);
            getSessinKey(resg.code).then(skres => {
              if (skres.code == 200) {
                console.log(skres);
                wx.getUserInfo({
                  success: (res) => {
                    console.log(res)
                    var userInfo = this.data.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    //登录调用
                    getUser({
                      encryptedData: e.detail.encryptedData,
                      headPortraitLink: avatarUrl,
                      iv: e.detail.iv,
                      nickname: nickName,
                      sessionKey: skres.data.sessionKey,
                      unionId: skres.data.openId
                    }).then(logRes => {
                      if(logRes.code == 200){
                        wx.setStorageSync('token', logRes.data.token);
                        wx.navigateBack()
                      }
                    }).catch(err => {
                      wx.showToast({
                        title: err
                      })
                      console.log(err)
                    })
                  }
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        }
      })
    }
  },
  userInfo() {
    wx.getUserInfo({
      success: (res) => {
        wx.setStorageSync('is_auth', true)
        this.setData({
          userInfo: res.userInfo,
          is_auth: true
        })
      }
    })
  },
  toProtocol() {
    wx.navigateTo({
      url: '/pages/protocol/index'
    })
  }
})