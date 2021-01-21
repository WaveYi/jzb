// pages/merchant/index.js
import {
  savaRegistr,
  updateRegistr,
  queryRegistr,
  changeRegistr,
  getRegistrList,
  getTableInfoByUserId,
  uploadFile,
  sellaccept,
  updateUserInfo,
  update_user_info,
  getVerify
} from '../../../api/user.js'
import { base64src } from '../../../utils/base64src.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '添加登记人员信息',
    id: '',
    table_number: '',
    company_name: '',
    person_name: '',
    person_phone: '',
    person_email: '',
    wechat_number: '',
    address: '',
    couponId: '',
    is_edit: 0,//是否修改进来 0:不是  1:是
    is_from: 0,//是否是邀请点进来
    region: ['北京市', '北京市', '东城区'],
    is_show_table_info: false,//是否显示用户桌子信息
    position: [{id:0,val:'企业老板'},{id:1,val:'企业高管'},{id:1,val:'企业经理'}],
    position_index: 0,
    room_id: '',
    verify1: '',
    verify2: '',
    verify3: '',
    verify4: '',
    verify5: '',
    verify6: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      person_phone: wx.getStorageSync('userInfo').phone
    })
    if(options.is_from){
      this.setData({
        is_from: options.is_from
      })
    }
    if(options.room_id){
      this.setData({
        room_id: options.room_id
      })
    }

    getVerify({
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        if(res.data != null){
          let list = JSON.parse(res.data.verifyList);
          this.setData({
            verify1: list.businessName,
            verify2: list.name,
            verify3: list.email,
            verify4: list.address,
            verify5: list.phone,
            verify6: list.position
          })
        }
      }
    })

    queryRegistr({
      userId: wx.getStorageSync('userInfo').unionId,
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        if(res.data != null){
          this.setData({
            title: '修改登记人员信息',
            id: res.data.idKey,
            company_name: res.data.businessName,
            person_name: res.data.name,
            person_phone: res.data.phone,
            person_email: res.data.email,
            // wechat_number: res.data.wechatId,
            address: res.data.address,
            position_index: res.data.position,
            is_edit: 1
          })
        }
      }
    })

    if(options.coupon_id){
      this.setData({
        couponId: options.coupon_id
      })
    }

    getTableInfoByUserId({
      unionId: wx.getStorageSync('userInfo').unionId
    }).then((res)=>{
      if(res.code == 200){
        console.log('----获取用户桌子id----'+JSON.stringify(res))
        if(res.data != null){
          this.setData({
            table_number: res.data.number,
            is_show_table_info: true
          })
        }
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  bindPickerChange(e){
    this.setData({
      position_index: e.detail.value
    })
  },
  bindDateStartChange(e){
    this.setData({
      date_start: e.detail.value
    })
  },
  bindTimeChange(e){
    this.setData({
      time_start: e.detail.value
    })
  },
  bindDateEndChange(e){
    this.setData({
      date_end: e.detail.value
    })
  },
  radioChange(e){
    console.log(e.detail.value)
    this.setData({
      is_invite: e.detail.value
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
      uploadFile({
        file: res[0],
        type: '',
        Authentication: wx.getStorageSync('token')
      }).then((imgRes)=>{
        if(JSON.parse(imgRes.data).code == 200){
          let res = wx.getSystemInfoSync();
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
      })
      // wx.uploadFile({
      //   url: requestUrl + '/applet/file/upload', //仅为示例，非真实的接口地址
      //   filePath: res[0],
      //   name: 'file',
      //   header: {
      //     'Authentication': wx.getStorageSync('token')
      //   },
      //   formData:{
      //     type: ''
      //   },
      //   success (imgRes){
      //     // console.log('----ios1----'+JSON.stringify(imgRes))
      //     // console.log('----ios2----'+JSON.stringify(imgRes.data))
      //     // console.log('----ios3----'+JSON.parse(imgRes.data).data)
      //     if(JSON.parse(imgRes.data).code == 200){
      //       let res = wx.getSystemInfoSync();
      //       that.setData({
      //         roomImg: img_pic,
      //         is_roomImg: 1
      //       })
      //     }else{
      //       wx.showModal({
      //         title: "提示",
      //         content: JSON.parse(imgRes.data).msg || JSON.parse(imgRes.data).message,
      //         showCancel: false
      //       })
      //     }
      //   }
      // })
    })
  },
  acceptInvite(){
    sellaccept({
      accept: 1,
      idKey: this.data.couponId
    }).then((ress)=>{
      if(ress.code == 200){
        let data1 = {
          unionId: wx.getStorageSync('userInfo').unionId,
          enterpriseName: this.data.company_name,
          realName: this.data.person_name,
          position: this.data.position_index,
          email: this.data.person_email,
          address: this.data.address
        }
        updateUserInfo(data1).then(resu=>{
          if(resu.code == 200){
            console.log('----同意邀请修改登记数据----'+JSON.stringify(resu))
          }
        })
        update_user_info().then((ures)=>{
          if(ures.code == 200){
            wx.setStorageSync('token', ures.data.token);
          }
        })
        setTimeout(()=>{
          publicFun.getToast('成功接受邀请');
        },500)
        setTimeout(()=>{
          wx.navigateBack();
        },2000)
      }
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
    // if(this.data.company_name==''){
    //   publicFun.getToast('请输入企业名称')
    //   return;
    // }
    // if(this.data.person_name==''){
    //   publicFun.getToast('请输入真实名字')
    //   return;
    // }
    // if(this.data.person_phone==''){
    //   publicFun.getToast('请输入联系方式')
    //   return;
    // }
    // if(this.data.person_email==''){
    //   publicFun.getToast('请输入邮箱')
    //   return;
    // }
    // if(this.data.address==''){
    //   publicFun.getToast('请输入收货地址')
    //   return;
    // }
    // if(this.data.position_index == null){
    //   publicFun.getToast('请选择职位');
    //   return;
    // }
    // if(this.data.roomImg==''){
    //   publicFun.getToast('请选择会议背景图片')
    //   return;
    // }
    let room_id = '';
    if(wx.getStorageSync('room_id')){
      room_id = wx.getStorageSync('room_id');
    }else{
      room_id = this.data.room_id;
    }
    let data = {
      roomId: room_id,
      userId: wx.getStorageSync('userInfo').unionId,
      businessName: this.data.company_name,
      name: this.data.person_name,
      phone: this.data.person_phone,
      email: this.data.person_email,
      wechatId: this.data.wechat_number,
      address: this.data.address,
      position: this.data.position_index
    }

    if(this.data.is_edit == 1){
      data.idKey = this.data.id;
    }
    
    if(this.data.is_edit == 0){
      savaRegistr(data).then(res=>{
        if(res.code == 200){
          if(this.data.is_from == 1){
            this.acceptInvite();
          }else{
            publicFun.getToast('提交成功');
            setTimeout(()=>{
              wx.navigateBack();
            },1500)
          }
        }
      })
    }else{
      updateRegistr(data).then(res=>{
        if(res.code == 200){
          if(this.data.is_from == 1){
            this.acceptInvite();
          }else{
            publicFun.getToast('修改成功');
            setTimeout(()=>{
              wx.navigateBack();
            },1500)
          }
        }
      })
    }
  }
})