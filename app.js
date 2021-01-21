//app.js
App({
  globalData: {
    userInfo: null,
    is_login: 0
  },
  onLaunch: function() {
    var that = this;
    wx.checkSession({
      success () {
        console.log('登录未过期');
        wx.setStorageSync('check', 1)
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        console.log('登录已过期');
        wx.setStorageSync('check', 2)
        // session_key 已经失效，需要重新执行登录流程
      }
    })
    // // 登录
    wx.formatParmas = this.formatParmas;
    //转为unicode 编码
    wx.encodeUnicode = this.encodeUnicode;
    // 解码  
    wx.decodeUnicode = this.decodeUnicode;
    //解析url中的参数
    wx.getQueryString = this.getQueryString;
  },
  //格式化传参
  formatParmas(array) {
    let newUrl = [];
    for (let i in array) {
      newUrl.push(i + "=" + array[i]);
    }
    return newUrl.join('&');
  },
  //转为unicode 编码
  encodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
      res[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + res.join("\\u");
  },

  // 解码  
  decodeUnicode(str) {
    str = str.replace(/\\/g, "%");
    return unescape(str);
  },
  //解析url中的参数
  getQueryString({url, name}) {
    var reg = new RegExp('(^|&|/?)' + name + '=([^&|/?]*)(&|/?|$)', 'i');
    var r = url.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }
    return null;
  },
})