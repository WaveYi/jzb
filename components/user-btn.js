// components/user-btn.js
import {
  login,
  getUser,
  getSessinKey
} from '../api/user.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    getWxLogin(){
      wx.getNetworkType({
        success (res) {
          console.log(res.networkType);
          if(res.networkType == 'unknown' || res.networkType == 'none'){
            wx.showToast({
              title: '请检查网络状态',
              icon: 'none'
            })
            return;
          }
        }
      })
      wx.login({
        success: (resg) => {
          console.log('11111'+JSON.stringify(resg))
          if (resg.code) {
            getSessinKey(resg.code).then(skres => {
              if (skres.code == 200) {
                wx.getUserInfo({
                  success: (res) => {
                    console.log(res)
                    var userInfo = res.userInfo
                    var nickName = userInfo.nickName
                    var avatarUrl = userInfo.avatarUrl
                    //登录调用
                    wx.navigateTo({
                      url: '/pages/login/index'
                    })
                  }
                })
              }
            })
          } else {
            console.log('登录失败！' + res.errMsg)
          }
        },
        fail: (err)=>{
          console.log('取消授权：'+JSON.stringify(err))
        }
      })
    },
    userInfoFun(e){
      let that = this;
      wx.checkSession({
        success () {
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail () {
          // session_key 已经失效，需要重新执行登录流程
          wx.getSetting({
            success (res) {
              console.log(res.authSetting['scope.userInfo'])
              if(res.authSetting['scope.userInfo'] == true){
                that.getWxLogin();
              }
            }
          })
        }
      })
    }
  }
})
