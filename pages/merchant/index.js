// pages/merchant/index.js
import {
  uploadFile,
  addMerchantInfo,
  queryBusinessInfo,
  createMeeting,
  getMeeting,
  updateById
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
import publicFun from '../../utils/public.js'
// var requestUrl = 'http://192.168.1.2:8094'
var requestUrl = 'https://e.3p3.top'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business_id: '',
    name: '',
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
    // 房间信息
    id: '',
    room_name: '',
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
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      person_phone: wx.getStorageSync('userInfo').phone
    })

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month<10){
      month = '0'+month;
    }
    if(day<10){
      day = '0'+day;
    }
    let today_date = year + '-' + month + '-' + day;
    this.setData({
      date_start: today_date,
      date_end: today_date
    })

    if(options.is_edit){
      getMeeting({
        idKey: wx.getStorageSync('room_id'),
        userId: wx.getStorageSync('userInfo').unionId
      }).then((res)=>{
        if(res.code == 200){
          let items = res.data;
          let time_start = items.activityStartTime.split(' ')[1].split(':')[0]+':'+items.activityStartTime.split(' ')[1].split(':')[1];
          let time_end = items.activityEndTime.split(' ')[1].split(':')[0]+':'+items.activityEndTime.split(' ')[1].split(':')[1];
          this.data.items[items.isGuestInvite].checked = true;
          this.setData({
            name: items.legalPerson,
            license: items.licenseImg,
            is_license: items.licenseImg==''?0:1,
            back_img: items.businessImg,
            is_back: items.businessImg==''?0:1,
            person_name: items.legalPerson,
            card: items.idnumber,
            person_code: items.uscc,
            company_name: items.businessName,
            card_img: items.idnumberImg,
            is_card: items.idnumberImg==''?0:1,
            book_img: items.authorizeImg,
            is_book: items.authorizeImg==''?0:1,
            is_pass: 0,

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
      })
    }

    // if(options.type){
    //   wx.setNavigationBarTitle({
    //     title: '修改资料'
    //   })
    //   this.type = options.type;
    //   this.getBusinessInfo();
    // }
    if(options.pass){
      this.setData({
        is_pass: options.pass
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
    this.getBusinessInfo();
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
  getBusinessInfo(){
    queryBusinessInfo({}).then((res)=>{
      if(res.code == 200){
        if(res.data != null && res.data.status == '待审批'){
          this.setData({
            is_pass: 1
          })
        }
        // this.setData({
        //   business_id: res.data.businessId,
        //   name: res.data.bossName,
        //   license: res.data.licenseImg,
        //   is_license: res.data.licenseImg==''?0:1,
        //   back_img: res.data.businessImg,
        //   is_back: res.data.businessImg==''?0:1,
        //   person_name: res.data.legalPerson,
        //   card: res.data.idnumber,
        //   person_code: res.data.uscc,
        //   company_name: res.data.businessName,
        //   card_img: res.data.idnumberImg,
        //   is_card: res.data.idnumberImg==''?0:1,
        //   book_img: res.data.authorizeImg,
        //   is_book: res.data.authorizeImg==''?0:1,
        //   is_pass: 0
        // })
      }
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
  chooseRoomImg(e){
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
  chooseLicense(e){
    var that = this;
    publicFun.getImage(1,false,['album']).then((res)=>{
      // uploadFile({
      //   file: res[0]
      // }).then((imgRes)=>{
      //   console.log(imgRes)
      // })
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
          console.log('----ios1----'+JSON.stringify(imgRes))
          console.log('----ios2----'+JSON.stringify(imgRes.data))
          console.log('----ios3----'+JSON.parse(imgRes.data).data)
          if(JSON.parse(imgRes.data).code == 200){
            let res = wx.getSystemInfoSync();
            let img_pic = JSON.parse(imgRes.data).data;
            if(res.platform == 'ios'){
              console.log('ios手机');
            }
            if(res.platform == 'android'){
              console.log('android手机');
            }
            
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
              back_img: img_pic,
              is_back: 1
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
  chooseCardImage(e){
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
              card_img: img_pic,
              is_card: 1
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
  chooseBookImage(e){
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
              book_img: img_pic,
              is_book: 1
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
    // if(this.data.person_code==''){
    //   wx.showToast({
    //     title: '请输入统一社会信用代码',
    //     icon: 'none'
    //   })
    //   return;
    // }
    // if(this.data.license==''){
    //   wx.showToast({
    //     title: '请上传执照',
    //     icon: 'none'
    //   })
    //   return;
    // }
    // if(this.data.back_img==''){
    //   wx.showToast({
    //     title: '请上传企业图片',
    //     icon: 'none'
    //   })
    //   return;
    // }
    if(this.data.name==''){
      publicFun.getToast('请输入姓名')
      return;
    }
    if(this.data.room_name==''){
      publicFun.getToast('请输入会议名称')
      return;
    }
    // if(this.data.person_phone==''){
    //   publicFun.getToast('请输入联系方式')
    //   return;
    // }
    if(this.data.roomImg==''){
      publicFun.getToast('请选择会议背景图片')
      return;
    }
    let data = {
      sponsorBusinessName: this.data.company_name,//企业名称
      sponsorName: this.data.person_name,//老板名称
      name: this.data.room_name,//房间名称
      phone: this.data.person_phone,//联系方式
      activityStartTime: this.data.date_start+' '+this.data.time_start,//活动开始时间
      activityEndTime: this.data.date_end+' '+this.data.time_end,//活动结束时间
      isGuestInvite: this.data.is_invite,//是否允许嘉宾邀请
      roomImg: this.data.roomImg,//会议背景图
      status: 0,//房间状态
      businessName: this.data.company_name,
      legalPerson: this.data.name,
      uscc: this.data.person_code,//统一社会信用代码
      licenseImg: this.data.license,//执照
      businessImg: this.data.back_img,//企业图片
      bossName: this.data.name,//老板名称
      idnumber: this.data.card,//身份证
      idnumberImg: this.data.card_img,//身份证图片
      authorizeImg: this.data.book_img//授权图片
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
    // console.log(this.data.business_id)
    // addMerchantInfo({
    //   businessId: this.data.business_id,
    //   businessName: this.data.company_name,//企业名称
    //   legalPerson: this.data.person_name,//法人名称
    //   uscc: this.data.person_code,//统一社会信用代码
    //   licenseImg: this.data.license,//执照
    //   businessImg: this.data.back_img,//企业图片
    //   bossName: this.data.name,//老板名称
    //   idnumber: this.data.card,//身份证
    //   idnumberImg: this.data.card_img,//身份证图片
    //   authorizeImg: this.data.book_img//授权图片
    // }).then(res=>{
    //   if(res.code == 200){
    //     if(this.data.business_id == ''){
    //       this.setData({
    //         name: '',
    //         license: '',
    //         is_license: 0,
    //         back_img: '',
    //         is_back: 0,
    //         person_name: '',
    //         card: '',
    //         person_code: '',
    //         company_name: '',
    //         card_img: '',
    //         is_card: 0,
    //         book_img: '',
    //         is_book: 0,
    //         is_pass: 1
    //       })
    //     }
    //     wx.showToast({
    //       title: '提交成功',
    //       icon: 'none'
    //     })
    //   }
    // })
  }
})