// pages/merchant/index.js
import {
  createMeeting,
  updateById
} from '../../../api/user.js'
import { base64src } from '../../../utils/base64src.js'
import publicFun from '../../../utils/public.js'
// var requestUrl = 'http://192.168.1.2:8094'
var requestUrl = 'https://e.3p3.top'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '创建会议',
    id: '',
    room_name: '',
    company_name: '',
    person_name: '',
    person_phone: '',
    date_start: '',
    time_start: '00:00',
    date_end: '',
    time_end: '00:00',
    roomImg: '',
    is_roomImg: 0,
    is_invite: 0,
    is_edit: 0,//是否修改进来 0:不是  1:是
    items: [
      {value: '0', name: '允许', checked: 'true'},
      {value: '1', name: '不允许'},
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month<10){
      return '0'+month;
    }
    if(day<10){
      return '0'+day;
    }
    let today_date = year + '-' + month + '-' + day;
    this.setData({
      date_start: today_date,
      date_end: today_date
    })
    console.log(new Date().getDate())

    if(options.item){
      let items = JSON.parse(decodeURIComponent(options.item))
      let time_start = items.activityStartTime.split(' ')[1].split(':')[0]+':'+items.activityStartTime.split(' ')[1].split(':')[1];
      let time_end = items.activityEndTime.split(' ')[1].split(':')[0]+':'+items.activityEndTime.split(' ')[1].split(':')[1];
      this.data.items[items.isGuestInvite].checked = true;
      this.setData({
        title: '修改公司',
        id: items.idKey,
        company_name: items.sponsorBusinessName,
        person_name: items.sponsorName,
        room_name: items.name,
        person_phone: items.phone,
        date_start: items.activityStartTime.split(' ')[0],
        date_end: items.activityEndTime.split(' ')[0],
        time_start: time_start,
        time_end: time_end,
        is_invite: items.isGuestInvite,
        items: this.data.items,
        roomImg: items.roomImg,
        is_roomImg: items.roomImg==""?0:1,
        is_edit: 1
      })
    }
    if(options.type){
      wx.setNavigationBarTitle({
        title: '修改资料'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindDateStartChange(e){
    this.setData({
      date_start: e.detail.value
    })
  },
  bindTimeStartChange(e){
    this.setData({
      time_start: e.detail.value
    })
  },
  bindDateEndChange(e){
    this.setData({
      date_end: e.detail.value
    })
  },
  bindTimeEndChange(e){
    this.setData({
      time_end: e.detail.value
    })
  },
  radioChange(e){
    console.log(e.detail.value)
    this.setData({
      is_invite: e.detail.value
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
  chooseLicense(e){
    var that = this;
    publicFun.getImage(1,false,['album']).then((res)=>{
      wx.uploadFile({
        url: requestUrl + '/applet/file/upload', //仅为示例，非真实的接口地址
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
            that.setData({
              roomImg: img_pic,
              is_roomImg: 1
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
      publicFun.getToast('请输入举办方企业名称')
      return;
    }
    if(this.data.person_name==''){
      publicFun.getToast('请输入举办方名称')
      return;
    }
    if(this.data.room_name==''){
      publicFun.getToast('请输入会议名称')
      return;
    }
    if(this.data.person_phone==''){
      publicFun.getToast('请输入联系方式')
      return;
    }
    if(this.data.roomImg==''){
      publicFun.getToast('请选择会议背景图片')
      return;
    }
    let data = {
      sponsorBusinessName: this.data.company_name,
      name: this.data.room_name,
      sponsorName: this.data.person_name,
      phone: this.data.person_phone,
      activityStartTime: this.data.date_start+' '+this.data.time_start,
      activityEndTime: this.data.date_end+' '+this.data.time_end,
      isGuestInvite: this.data.is_invite,
      roomImg: this.data.roomImg
    }
    if(this.data.is_edit == 1){
      data.idKey = this.data.id;
    }
    
    if(this.data.is_edit == 0){
      createMeeting(data).then(res=>{
        if(res.code == 200){
          publicFun.getToast('提交成功');
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
      })
    }else{
      updateById(data).then(res=>{
        if(res.code == 200){
          publicFun.getToast('修改成功');
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
      })
    }
  }
})