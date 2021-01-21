// pages/addCodeType/index.js
import {
  add_code_type,
  add_company_code_type
} from '../../../api/qqhh_user.js'
import publicFun from '../../../utils/public.js'
// var requestUrl = 'http://192.168.1.2:8094'
var requestUrl = 'https://e.3p3.top'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    type_name: '',
    code_img: '',
    is_code_img: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getTypeName(e){
    this.setData({
      type_name: e.detail.value
    })
  },
  chooseLicense(e){
    var that = this;
    publicFun.getImage(1,false,['album']).then((res)=>{
      // uploadFile({
      //   file: res[0]
      // }).then((imgRes)=>{
      //   console.log(imgRes)
      // })
      wx.uploadFile({
        url: requestUrl+"/applet/file/upload", //仅为示例，非真实的接口地址
        filePath: res[0],
        name: 'file',
        header: {
          'Authentication': wx.getStorageSync('token')
        },
        formData:{
          type: ''
        },
        success (imgRes){
          if(JSON.parse(imgRes.data).code == 200){
            let img_pic = JSON.parse(imgRes.data).data;
            console.log(img_pic);
            that.setData({
              code_img: img_pic,
              is_code_img: 1
            })
          }else{
            wx.showModal({
              title: "提示",
              content: JSON.parse(imgRes.data).msg || JSON.parse(imgRes.data).message,
              showCancel: false
            })
          }
        }
      })
    })
  },
  submit(){
    if(this.data.type_name == ''){
      publicFun.getToast('请输入类型名称');
      return;
    }
    if(this.data.code_img == ''){
      publicFun.getToast('请上传背景图');
      return;
    }
    if(this.data.type == '1'){
      add_code_type({
        typeName: this.data.type_name,
        img: this.data.code_img
      }).then((res)=>{
        if(res.code == 200){
          this.setData({
            type_name: '',
            code_img: '',
            is_code_img: 0
          })
          publicFun.getToast('提交成功');
          setTimeout(()=>{
            wx.navigateBack()
          },1500)
        }else{
          publicFun.getToast(res.msg || res.message);
        }
      })
    }else{
      add_company_code_type({
        typeName: this.data.type_name,
        img: this.data.code_img
      }).then((res)=>{
        if(res.code == 200){
          this.setData({
            type_name: '',
            code_img: '',
            is_code_img: 0
          })
          publicFun.getToast('提交成功');
          setTimeout(()=>{
            wx.navigateBack()
          },1500)
        }else{
          publicFun.getToast(res.msg || res.message);
        }
      })
    }
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