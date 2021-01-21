// pages/huiyibang/rule/index.js
import {
  verifyChangeByRoomId,
  getVerify
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rule_list: [
      {title:'企业名称',value: 0,required: false},
      {title:'真实名字',value: 1,required: false},
      {title:'邮箱',value: 2,required: false},
      {title:'收货地址',value: 3,required: false},
      // {title:'职位',value: 4,required: false}
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    getVerify({
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        if(res.data != null){
          let list = JSON.parse(res.data.verifyList);
          this.data.rule_list[0].required = list.businessName;
          this.data.rule_list[1].required = list.name;
          this.data.rule_list[2].required = list.email;
          this.data.rule_list[3].required = list.address;
          // this.data.rule_list[4].required = list.position;
          this.setData({
            rule_list: this.data.rule_list
          })
        }
      }
    })
  },

  clickCheckbox(e){
    let index = e.currentTarget.dataset.index;
    this.data.rule_list[index].required = !this.data.rule_list[index].required;
    this.setData({
      rule_list: this.data.rule_list
    })
  },
  submitForm(e){
    let vdata = {
      name: '名字',
      roomId: wx.getStorageSync('room_id'),
      verifyList: JSON.stringify({
        businessName: this.data.rule_list[0].required,
        name: this.data.rule_list[1].required,
        email: this.data.rule_list[2].required,
        address: this.data.rule_list[3].required,
        phone: true,
        position: true
      })
    }
    verifyChangeByRoomId(vdata).then((resv)=>{
      if(resv.code == 200){
        publicFun.getToast('提交成功');
        setTimeout(()=>{
          wx.navigateBack()
        },1500)
      }
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