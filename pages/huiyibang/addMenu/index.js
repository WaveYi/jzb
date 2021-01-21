// pages/merchant/index.js
import {
  addMenu,
  updateMenu,
  uploadFile,
  savaVideo,
  updateVideo,
  getVideoList,
  update_company_video,
  query_boss_publish_coupon,
  addCouponAgentList
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
    title: '添加节目',
    id: '',
    menu_name: '',
    describe: '',
    phone: '',
    type: '',
    date_start: '',
    time_start: '00:00',
    date_end: '',
    time_end: '00:00',
    img: '',
    is_img: 0,
    is_edit: 0,//是否修改进来 0:不是  1:是
    is_djqimg: 0,
    djqimg: '',
    videoLinks: [{name: '视频1',videoLink: ''}],
    items: [
      {value: '0', name: '扫码观看视频', checked: 'true'},
      {value: '1', name: '节目关注抽奖'},
      {value: '2', name: '投票'},
      {value: '3', name: '参与者抽奖'}
    ],
    menu_type: 0,//节目类型
    coupon_list: [],//代金券列表
    coupon_index: null,//代金券索引
    page: 1,
    djq_data: '',//代金券data
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
    console.log(new Date().getDate())

    // 获取代金券列表
    // let data = {
    //   status: 1,
    //   userId: wx.getStorageSync('user_boss_id'),
    //   pageNum: this.data.page,
    //   pageSize: 100
    // }
    // // let identity = wx.getStorageSync('room_role'+wx.getStorageSync('room_id'));
    // // if(identity == 2){
    // //   data.bossId = wx.getStorageSync('compereUserId')
    // // }
    // addCouponAgentList(data).then(res=>{
    //   if(res.code == 200){
    //     if(this.data.page == 1){
    //       this.setData({
    //         coupon_list: res.data
    //       })
    //     }else{
    //       this.setData({
    //         coupon_list: this.data.coupon_list.concat(res.data)
    //       })
    //     }
    //     if(options.item){
    //       let items = JSON.parse(decodeURIComponent(options.item))
    //       let coupon_id = items.couponId;
    //       console.log("coupon_id:--------"+coupon_id)
    //       console.log("this.data.coupon_list----"+JSON.stringify(this.data.coupon_list))
    //       for(let i in this.data.coupon_list){
    //         if(this.data.coupon_list[i].coupon_id == coupon_id){
    //           console.log("coupon_index:--------"+i)
    //           this.setData({
    //             coupon_index: i
    //           })
    //         }
    //       }
    //     }
    //   }
    // })

    if(options.item){
      let items = JSON.parse(decodeURIComponent(options.item))
      let time_start = items.startTime.split(' ')[1].split(':')[0]+':'+items.startTime.split(' ')[1].split(':')[1];
      let time_end = items.endTime.split(' ')[1].split(':')[0]+':'+items.endTime.split(' ')[1].split(':')[1];


      if(items.type == 0){
        this.data.items[0].checked = true;
      }else if(items.type == 1){
        this.data.items[1].checked = true;
      }else if(items.type == 2){
        this.data.items[2].checked = true;
      }else{
        this.data.items[3].checked = true;
      }
      this.setData({
        title: "修改节目",
        id: items.idKey,
        menu_name: items.title,
        describe: items.describe,
        menu_type: items.type,
        items: this.data.items,
        date_start: items.startTime.split(' ')[0],
        date_end: items.endTime.split(' ')[0],
        time_start: time_start,
        time_end: time_end,
        phone: items.electorName,
        djq_data: items.couponData,
        djqimg: items.couponData,
        is_djqimg: items.couponData==""?0:1,
        // videoLinks: items.videoLinks?items.videoLinks:[{name: '视频1',videoLink: ''}],
        img: items.img,
        is_img: items.img==""?0:1,
        is_edit: 1
      })

      getVideoList({
        roomId: wx.getStorageSync('room_id'),
        menuId: items.idKey
      }).then((res)=>{
        if(res.code == 200){
          if(res.data != null){
            this.setData({
              videoLinks: res.data.records
            })
          }
        }
      })
      console.log(items)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  scanGetCoupon(){
    let that = this;
    publicFun.getImage(1,false,['album']).then((res)=>{
      wx.uploadFile({
        url: requestUrl + '/applet/file/upload', //仅为示例，非真实的接口地址
        filePath: res[0],
        name: 'file',
        header: {
          'Authentication': wx.getStorageSync('token'),
          'pathMark': true
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
              djq_data: img_pic,
              djqimg: img_pic,
              is_djqimg: 1
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
    return;
    wx.scanCode({
      success (res) {
        console.log('---扫码返回的参数1---'+res.result);
        let dataStr = res.result.replace("https://p.3p3.top?data=","");
        console.log('---扫码返回的参数2---'+dataStr);
        wx.showModal({
          title: "提示",
          content: "代金券扫描成功",
          showCancel: false
        })
        that.setData({
          djq_data: dataStr
        })
      }
    })
  },
  bindCouponPickerChange(e){
    this.setData({
      coupon_index: e.detail.value
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
      menu_type: e.detail.value
    })
  },
  addVideo(){
    if(this.data.videoLinks.length >= 9){
      publicFun.getToast('最多上传9个视频');
      return;
    }
    let len = this.data.videoLinks.length+1;
    this.data.videoLinks.push({
      name: '视频'+len,
      videoLink: ''
    })
    this.setData({
      videoLinks: this.data.videoLinks
    })
  },
  addVideoLink(e){
    let index = e.currentTarget.dataset.index;
    this.data.videoLinks[index].videoLink = e.detail.value;
    this.setData({
      videoLinks: this.data.videoLinks
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
          'Authentication': wx.getStorageSync('token'),
          'pathMark': true
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
              img: img_pic,
              is_img: 1
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
  changeVideo(sort_idx,newUrl){
    let data = {
      sort: sort_idx,
      videoId: this.data.video_id,
      typeId: this.data.type_id,
      link: newUrl,
      status: this.data.status
    }
    update_company_video(data).then((res)=>{
      if(res.code == 200){
        if(this.data.into == 'add'){
          publicFun.getToast('添加成功');
        }else{
          publicFun.getToast('修改成功');
        }
      }
    })
  },
  addChangeVideo(){
    let data = {
      roomId: wx.getStorageSync('room_id'),
      menuId: this.data.menu_id,
      name: this.data.name,
      videoLink: this.data.videoLink
    }
    if(this.data.is_edit == 1){
      data.idKey = this.data.id;
    }
    if(this.data.is_edit == 0){
      savaVideo(data).then(res=>{
        if(res.code == 200){
          publicFun.getToast('提交成功');
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
      })
    }else{
      updateVideo(data).then(res=>{
        if(res.code == 200){
          publicFun.getToast('修改成功');
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
      })
    }
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
    if(this.data.menu_name==''){
      publicFun.getToast('请输入节目标题')
      return;
    }
    // if(this.data.describe==''){
    //   publicFun.getToast('请输入节目描述')
    //   return;
    // }
    if(this.data.menu_type == 2){
      if(this.data.phone==''){
        publicFun.getToast('请输入被选举人姓名')
        return;
      }
    }
    for(let i in this.data.videoLinks){
      if(this.data.videoLinks[i].videoLink == ''){
        publicFun.getToast('请输入一个视频地址');
        return;
      }
    }
    for(let i in this.data.videoLinks){
      if(this.data.videoLinks[i].videoLink.indexOf('challenge') != '-1'){
        // 微视挑战类型视频转换
        let cs_id = this.data.videoLinks[i].videoLink.split('&')[0].split('=')[1];
        let all_cs = this.data.videoLinks[i].videoLink.split('?')[1];
        this.data.videoLinks[i].videoLink = 'https://h5.weishi.qq.com/weishi/feed/'+ cs_id + '/wsfeed?' + all_cs
      }
	  
      if(this.data.videoLinks[i].videoLink.indexOf('isee.weishi') != '-1'){
        // 微视isee类型视频转换
        let cs_id = this.data.videoLinks[i].videoLink.split('&')[1].split('=')[1];
        let all_cs = this.data.videoLinks[i].videoLink.split('?')[1];
        this.data.videoLinks[i].videoLink = 'https://h5.weishi.qq.com/weishi/feed/'+ cs_id + '/wsfeed?' + all_cs
      }
    }
    if(this.data.img==''){
      publicFun.getToast('请选择节目背景图片')
      return;
    }
    let menuInfo = {
      roomId: wx.getStorageSync('room_id'),
      title: this.data.menu_name,
      describe: this.data.describe,
      electorName: this.data.phone,
      type: this.data.menu_type,
      startTime: this.data.date_start+' '+this.data.time_start,
      endTime: this.data.date_end+' '+this.data.time_end,
      img: this.data.img
    }
    if(this.data.menu_type == 1){
      // menuInfo.couponId = this.data.djq_data.split(',')[2].split('=')[1]
      menuInfo.couponData = this.data.djq_data
    }
    console.log("menuInfo.couponId---"+menuInfo.couponId)
    if(this.data.is_edit == 1){
      menuInfo.idKey = this.data.id;
    }
    let data = {
      menuInfo: menuInfo,
      menuVideoLink: this.data.videoLinks
    }
    if(this.data.is_edit == 0){
      addMenu(data).then(res=>{
        if(res.code == 200){
          publicFun.getToast('提交成功');
          setTimeout(()=>{
            wx.navigateBack();
          },1500)
        }
      })
    }else{
      updateMenu(data).then(res=>{
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