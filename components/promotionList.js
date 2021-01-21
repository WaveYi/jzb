// components/promotionList.js
import {
  getSessinKey,
  update_phone
} from '../api/user.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    list: {
      type: Array,
      value: []
    },
    identity: {
      type: String,
      value: ''
    },
    phone: {
      type: String,
      value: ''
    },
    has_user: {
      type: String,
      value: ''
    },
    is_click: {
      type: Boolean,
      value: ''
    }
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
    getUserPhone(e){
      console.log(this.data.phone);
      var that = this;
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
          getSessinKey(resg.code).then(skres => {
            update_phone({
              encryptedData: e.detail.encryptedData,
              iv: e.detail.iv,
              sessionKey: skres.data.sessionKey
            }).then((upres)=>{
              if(upres.code == 200){
                wx.setStorageSync('token', upres.data.token);
                that.triggerEvent('myshow');
              }
            })
          })
        }
      })
    },
    clickItem(e){
      if(wx.getStorageSync('check') != 1){
        // session_key 已经失效，需要重新执行登录流程
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
        return;
      }
      var myEventDetail = {
        title: e.currentTarget.dataset.item.title,
        index: e.currentTarget.dataset.index
      } // detail对象，提供给事件监听函数
      var myEventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myEventDetail, myEventOption)
    }
  }
})
