// pages/couponDetail/index.js
import {
  showUserQRCode,
  save_coupon_image,
  buy_coupon,
  previewAgentCouponImg,
  previewSellCouponImg,
  show_coupon_image,
  show_sell_coupon_image
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
import publicFun from '../../utils/public.js'
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon_id: '',
    cert_id: '',
    number: '',
    src: '',
    save_src: '',
    user_code: '',
    is_buy: 0, //是否是购买进入
    role_type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type == 'djq'){
      this.setData({
        src: options.src
      })
      return;
    }

    this.setData({
      // src: options.src,
      coupon_id: options.id
    })
    wx.showLoading({
      title: '加载中'
    })

    let role_type = wx.getStorageSync('room_role'+wx.getStorageSync('room_id'));
    if(role_type == 1){
      this.setData({
        role_type: role_type
      })
    }

    if(options.type == 'buy'){
      // console.log('已购原始图：'+wx.getStorageSync('buy_old'));
      // if(wx.getStorageSync('buy_old') != ''){
      //   wx.hideLoading();
      //   this.setData({
      //     src: wx.getStorageSync('buy_old')
      //   })
      // }else{
        // 展示已购促销券
        let data = {
          idKey: options.id
        }
        // if(role_type == 1){
        //   data.roomId = wx.getStorageSync('room_id')
        // }
        previewSellCouponImg(data).then((res)=>{
          if(res.code == 200){
            // console.log('已购的图片：'+res.data);
            this.setData({
              src: res.data.imageNum
            })
            wx.hideLoading();
          }
        }).catch((err)=>{
          wx.hideLoading();
          timer = setInterval(()=>{
            this.showBuyPhoto();
          },2000)
        })
      // }
    }else{
      console.log('浏览原始图：'+wx.getStorageSync('look_old'));
      // if(wx.getStorageSync('look_old') != ''){
      //   wx.hideLoading();
      //   this.setData({
      //     src: wx.getStorageSync('look_old')
      //   })
      // }else{
        // 展示促销劵原始图[点击浏览列表]
        let data = {
          couponAgentId: options.id
        }
        // if(role_type == 1){
        //   data.roomId = wx.getStorageSync('room_id')
        // }
        previewAgentCouponImg(data).then((res)=>{
          if(res.code == 200){
            this.setData({
              src: res.data.imageNum
            })
            wx.hideLoading();
            // console.log('浏览的图片：'+res.data);
            // const base64ImgUrl = "data:image/png;base64," + res.data;
            // base64src(base64ImgUrl,options.certId,ress=>{
              
            // })
          }
        }).catch((err)=>{
          wx.hideLoading();
          timer = setInterval(()=>{
            this.showLookPhoto();
          },2000)
        })
      // }
    }
    
    // save_coupon_image({
    //   certId: options.certId
    // }).then((res)=>{
    //   if(res.code == 200){
    //     console.log('下载的图片：'+res.data);
    //     this.setData({
    //       save_src: res.data
    //     })
    //   }
    // })
    // console.log(options);
    // this.getQrCode();
    if(options.type == 'buy'){
      this.setData({
        is_buy: 1
      })
    }
  },
  //获取二维码
  getQrCode(){
    showUserQRCode().then(res=>{
      if(res.code == 200){
        const base64ImgUrl = "data:image/png;base64," + res.data;
        base64src(base64ImgUrl,1,ress=>{
          this.data.user_code = ress;
          this.setData({
            user_code: this.data.user_code
          })
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  showBuyPhoto(){
    // 展示已购促销券
    let data = {
      idKey: this.data.coupon_id
    }
    // if(this.data.role_type == 1){
    //   data.roomId = wx.getStorageSync('room_id')
    // }
    previewSellCouponImg(data).then((res)=>{
      clearInterval(timer);
      if(res.code == 200){
        // console.log('已购的图片：'+res.data);
        this.setData({
          src: res.data.imageNum
        })
        wx.hideLoading();
      }
    })
  },
  showLookPhoto(){
    let data = {
      couponAgentId: this.data.coupon_id
    }
    // if(this.data.role_type == 1){
    //   data.roomId = wx.getStorageSync('room_id')
    // }
    previewAgentCouponImg(data).then((res)=>{
      clearInterval(timer);
      if(res.code == 200){
        this.setData({
          src: res.data.imageNum
        })
      }
    })
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
    clearInterval(timer);
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timer);
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
  onShareAppMessage: function (res) {
    console.log(JSON.stringify(res))
    var that = this;
    return {
      imageUrl: that.data.src
    }
  },
  downloadImg(){
    var that = this;
    console.log('下载的图片'+that.data.src)
    wx.showModal({
      title: '提示',
      content: '确定下载促销券图片？',
      success: function(res) {
        if(res.confirm){
          wx.downloadFile({
            url: that.data.src,
            success: (ress) => {
              if (ress.statusCode === 200) {
                console.log(ress.tempFilePath);
                wx.saveImageToPhotosAlbum({
                  filePath: ress.tempFilePath,
                  success: function () { 
                    // publicFun.getToast('下载成功');
                    wx.showModal({
                      title: "提示",
                      content: "下载成功",
                      showCancel: false
                    })
                  }
                })
              }
            },
            fail(err) {
              if(err.errMsg === "saveImageToPhotosAlbum:fail:auth denied") {
                wx.openSetting({
                  success(settingdata) {
                    console.log(settingdata)
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      console.log("获取权限成功，再次点击图片保存到相册")
                    } else {
                      console.log("获取权限失败")
                    }
                  }
                })
              }
              publicFun.getToast('下载失败');
            }
          })
        }
      }
    })
  }
})