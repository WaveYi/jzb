// pages/merchant/index.js
import {
  save_company_info,
  user,
  upload,
  get_company_info
} from '../../../api/qqhh_user.js'
import publicFun from '../../../utils/public.js'
// var requestUrl = 'http://192.168.1.2:8094'
var requestUrl = 'https://e.3p3.top'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    company_id: '',
    name: '',
    type: '2',
    license: '',
    is_license: 0,
    back_img: '',
    is_back: 0,
    person_name: '',
    card: '',
    person_code: '',
    company_name: '',
    card_img: '',
    is_card: 0,
    book_img: '',
    is_book: 0,
    is_pass: 0,
    is_from: '',
    company_type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      wx.setNavigationBarTitle({
        title: '公司信息'
      })
      this.setData({
        is_from: options.type
      })
      this.getCompanyInfo();
    }
    // if(options.pass){
    //   this.setData({
    //     is_pass: options.pass
    //   })
    // }
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

  getCompanyInfo(){
    get_company_info().then((res)=>{
      if(res.code == 200){
        this.setData({
          type: res.data.type,//企业类型
          company_id: res.data.companyId,
          company_name: res.data.companyName,
          person_name: res.data.legalPerson,
          person_code: res.data.uscc,
          license: res.data.licenseImg,
          is_license: res.data.licenseImg==null?0:1,
          back_img: res.data.img,
          is_back: res.data.img==null?0:1
        })
      }
    })
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
  selectType(e){
    this.setData({
      type: e.detail.value
    })
  },
  getName(e){
    this.setData({
      name: e.detail.value
    })
  },
  getPersonName(e){
    this.setData({
      person_name: e.detail.value
    })
  },
  getCard(e){
    this.setData({
      card: e.detail.value
    })
  },
  getPersonCode(e){
    this.setData({
      person_code: e.detail.value
    })
  },
  getCompanyName(e){
    this.setData({
      company_name: e.detail.value
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
          // console.log('----ios1----'+JSON.stringify(imgRes))
          // console.log('----ios2----'+JSON.stringify(imgRes.data))
          // console.log('----ios3----'+JSON.parse(imgRes.data).data)
          if(JSON.parse(imgRes.data).code == 200){
            let img_pic = JSON.parse(imgRes.data).data;
            that.setData({
              license: img_pic,
              is_license: 1
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
  chooseImageFun(e){
    var that = this;
    publicFun.getImage(1,false,['album']).then((res)=>{
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
          if(JSON.parse(imgRes.data).code == 200){
            let img_pic = JSON.parse(imgRes.data).data;
            that.setData({
              back_img: img_pic,
              is_back: 1
            })
          }else{
            wx.showModal({
              title: "提示",
              content: JSON.parse(imgRes.data).msg || JSON.parse(imgRes.data).message,
              showCancel: false
            })
          }
        }
      })
    })
  },
  chooseCardImage(e){
    var that = this;
    publicFun.getImage(1,false,['album']).then((res)=>{
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
          if(JSON.parse(imgRes.data).code == 200){
            let img_pic = JSON.parse(imgRes.data).data;
            that.setData({
              card_img: img_pic,
              is_card: 1
            })
          }else{
            wx.showModal({
              title: "提示",
              content: JSON.parse(imgRes.data).msg || JSON.parse(imgRes.data).message,
              showCancel: false
            })
          }
        }
      })
    })
  },
  chooseBookImage(e){
    var that = this;
    publicFun.getImage(1,false,['album']).then((res)=>{
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
          if(JSON.parse(imgRes.data).code == 200){
            let img_pic = JSON.parse(imgRes.data).data;
            that.setData({
              book_img: img_pic,
              is_book: 1
            })
          }else{
            wx.showModal({
              title: "提示",
              content: JSON.parse(imgRes.data).msg || JSON.parse(imgRes.data).message,
              showCancel: false
            })
          }
        }
      })
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
    if(this.data.company_name==''){
      wx.showToast({
        title: '请输入企业名称',
        icon: 'none'
      })
      return;
    }
    if(this.data.person_name==''){
      wx.showToast({
        title: '请输入法人名称',
        icon: 'none'
      })
      return;
    }
    if(this.data.person_code==''){
      wx.showToast({
        title: '请输入统一社会信用代码',
        icon: 'none'
      })
      return;
    }
    if(this.data.license==''){
      wx.showToast({
        title: '请上传执照',
        icon: 'none'
      })
      return;
    }
    if(this.data.back_img==''){
      wx.showToast({
        title: '请上传企业图片',
        icon: 'none'
      })
      return;
    }
    save_company_info({
      // companyId: this.data.company_id,
      // type: this.data.type,
      companyName: this.data.company_name,//企业名称
      legalPerson: this.data.person_name,//法人名称
      uscc: this.data.person_code,//统一社会信用代码
      licenseImg: this.data.license, //执照 
      img: this.data.back_img  //企业图片
    }).then(res=>{
      if(res.code == 200){
        if(this.data.company_id == ''){
          this.setData({
            license: '',
            back_img: '',
            is_back: 0,
            is_license: 0,
            person_name: '',
            person_code: '',
            company_name: ''
          })
        }
        user().then(user_res => {
          if (user_res.code == 200) {
            wx.setStorageSync('is_login', true);
            wx.setStorageSync('userInfo', user_res.data);
          }
        })
        wx.showToast({
          title: '提交成功',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
})