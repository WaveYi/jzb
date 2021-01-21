// pages/shopTransfer/index.js
import {
  business_tran,
  business_tran_info,
  business_tran_boss_status,
  business_tran_receiver_status
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    is_shop: false,//是否有店铺转让数据
    shopInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      this.setData({
        type: options.type
      })
    }
    this.getTransferInfo();
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
  getTransferInfo(){
    business_tran_info().then((res)=>{
      if(JSON.stringify(res.data) != "{}"){
        this.data.is_shop = true
      }
      if(res.code == 200){
        this.setData({
          shopInfo: res.data,
          is_shop: this.data.is_shop
        })
      }
    })
  },
  shopTransfer(){
    var that = this;
    wx.scanCode({
      
      success: (res) => {
        business_tran({
          receiverId: res.result
        }).then((ress)=>{
          console.log('----店铺转让----'+JSON.stringify(ress));
          setTimeout(()=>{
            that.getTransferInfo();
          },500)
        })
      }
    })
  },
  transferAgree(){
    console.log(this.data.shopInfo.type,this.data.shopInfo.tranId)
    if(this.data.shopInfo.type == '1'){
      // 老板状态修改--同意
      business_tran_boss_status({
        status: 1,
        tranId: this.data.shopInfo.tranId
      }).then((res)=>{
        if(res.code == 200){
          this.getTransferInfo();
        }
      })
    }else{
      // 接收人状态修改--同意
      business_tran_receiver_status({
        status: 1,
        tranId: this.data.shopInfo.tranId
      }).then((res)=>{
        if(res.code == 200){
          this.getTransferInfo();
        }
      })
    }
  },
  transferReject(){
    if(this.data.shopInfo.type == '1'){
      // 老板状态修改--拒绝
      business_tran_boss_status({
        status: 2,
        tranId: this.data.shopInfo.tranId
      }).then((res)=>{
        if(res.code == 200){
          this.getTransferInfo();
        }
      })
    }else{
      // 接收人状态修改--拒绝
      business_tran_receiver_status({
        status: 2,
        tranId: this.data.shopInfo.tranId
      }).then((res)=>{
        if(res.code == 200){
          this.getTransferInfo();
        }
      })
    }
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