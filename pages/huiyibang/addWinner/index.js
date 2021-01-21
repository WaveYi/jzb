// pages/merchant/index.js
import {
  addWinner,
  updateWinner
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '申请角色',
    id: '',
    enterpriseName: '',
    realName: '',
    phone: '',
    address: '',
    region: ['北京市', '北京市', '东城区'],
    role_type: '0',
    is_edit: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.item){
      let item = JSON.parse(decodeURIComponent(options.item));
      this.setData({
        id: item.idKey,
        enterpriseName: item.businessName,
        realName: item.name,
        phone: item.phone,
        address: item.address,
        is_edit: 1
      })
    }
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
  getInputVal(e){
    let prams1 = e.target.dataset.key;
    this.setData({
      [prams1]: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.data.address = e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2];
    this.setData({
      region: e.detail.value,
      address: this.data.address
    })
  },
  submitForm(e){
    var reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    // if(!reg.test(this.data.card)){
    //   wx.showToast({
    //     title: '请输入正确的身份证号码',
    //     icon: 'none'
    //   })
    //   return;
    // }
    let data = {
      idKey: this.data.id,
      roomId: wx.getStorageSync('room_id'),
      businessName: this.data.enterpriseName,
      name: this.data.realName,
      phone: this.data.phone,
      address: this.data.address
    }
    updateWinner(data).then(res=>{
      if(res.code == 200){
        publicFun.getToast('修改成功');
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      }
    })
  }
})