// pages/editCoupon/index.js
import {
  editCoupon,
  publishCoupon,
  // queryEditCouponInfo
} from '../../api/user.js'
import publicFun from '../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '', //促销券id
    type: '',
    coupon_name: '',
    price: 0,
    face: 0,
    count: '',
    date: '',
    profit: '',
    frequence: 0,
    buyFrequence: 0,
    date_txt: '请选择促销券有效时间',
    is_edit: false,
    couponId: '',
    video_list: [{sort: 1,videoName: '视频1',weseeLink: ''},{sort: 2,videoName: '视频2',weseeLink: ''},{sort: 3,videoName: '视频3',weseeLink: ''}],
    today_date: '',//当天日期
    from_type: 0,//促销券：0  代金券：1
    coupon_index: null,
    coupon_type: 0,//0:学员券  1:教师券
    couponTypes: [{name: 'Java'},{name: 'PHP'},{name: 'Python'},{name: 'C++'},{name: 'C#'},{name: 'HTML'},{name: 'Javascript'},{name: 'Vue'},{name: 'React'},{name: 'Node'},{name: 'Angular'}],
    items: [
      {value: '0', name: '学员券', checked: 'true'},
      {value: '1', name: '教师券'},
    ],
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
      today_date: today_date
    })

    if(options.id){
      this.setData({
        id: options.id
      })
    }
    if(options.type){
      this.setData({
        type: options.type
      })
    }
    if(options.from_type){
      if(options.from_type == 1){
        this.setData({
          date_txt: '请选择代金券有效时间'
        })
      }
      this.setData({
        from_type: options.from_type
      })
    }
    console.log(options.id, options.type, options.from_type)
    // this.getEditFinish();
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
  getEditFinish(save){
    queryEditCouponInfo({
      imageNum: this.data.id
    }).then((res)=>{
      if(res.code == 200){
        if(save){
          publicFun.getToast('编辑成功');
          setTimeout(()=>{
            let pages = getCurrentPages(); // 当前页的数据，
            let prevPage = pages[pages.length - 2]; // 上一页的数据
            prevPage.setData({
              is_edit_back: true // 修改上一页的属性值；
            })
            wx.navigateBack({
              delta: 1
            })
          },1500)
        }else{
          this.setData({
            is_edit: res.data!=null?true:false,
            couponId: res.data!=null?res.data.couponId:'',
            coupon_name: res.data!=null?res.data.couponName:'',
            count: res.data!=null?res.data.count:'',
            price: res.data!=null?res.data.price:'',
            profit: res.data!=null?res.data.profit:'',
            frequence: res.data!=null?res.data.frequence:'',
            buyFrequence: res.data!=null?res.data.buyFrequence:'',
            date: res.data!=null?res.data.trem:'',
            date_txt: res.data!=null?res.data.trem:this.data.from_type==0?'请选择促销券有效时间':'请选择代金券有效时间',
            face: res.data!=null?res.data.value:'',
            video_list: res.data!=null?res.data.codeVideoList:this.data.video_list
          })
        }
        console.log(this.data.is_edit,this.data.couponId)
      }
    })
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
  radioChange(e){
    this.setData({
      coupon_type: e.detail.value
    })
  },
  bindPickerChange(e){
    this.setData({
      coupon_index: e.detail.value
    })
  },
  getCouponName(e){
    this.setData({
      coupon_name: e.detail.value
    })
  },
  getPrice(e){
    this.setData({
      price: e.detail.value
    })
  },
  getFace(e){
    this.setData({
      face: e.detail.value
    })
  },
  getCount(e){
    this.setData({
      count: e.detail.value
    })
  },
  getProfit(e){
    this.setData({
      profit: e.detail.value
    })
  },
  getFrequence(e){
    this.setData({
      frequence: e.detail.value
    })
  },
  getBuyFrequence(e){
    this.setData({
      buyFrequence: e.detail.value
    })
  },
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value,
      date_txt: e.detail.value
    })
  },
  getVideoName(e){
    let index = e.currentTarget.dataset.index;
    let videoCur = this.data.video_list;
    videoCur[index].videoName = e.detail.value;
    this.setData({
      video_list: videoCur
    })
  },
  getVideoUrl(e){
    let index = e.currentTarget.dataset.index;
    let videoCur = this.data.video_list;
    videoCur[index].weseeLink = e.detail.value;
    this.setData({
      video_list: videoCur
    })
  },
  save(){
    // if(this.data.price == ''){
    //   publicFun.getToast('请输入促销券价格');
    //   return;
    // }
    // if(this.data.face == ''){
    //   publicFun.getToast('请输入促销券面额');
    //   return;
    // }
    if(this.data.from_type == 0){
      if(this.data.date == ''){
        publicFun.getToast('请选择促销券有效时间');
        return;
      }
      if(this.data.count == ''){
        publicFun.getToast('请输入促销券有效次数');
        return;
      }
    }else{
      if(this.data.date == ''){
        publicFun.getToast('请选择代金券有效时间');
        return;
      }
      if(this.data.count == ''){
        publicFun.getToast('请输入代金券有效次数');
        return;
      }
    }
    
    // if(this.data.profit == ''){
    //   publicFun.getToast('请输入代理人收益');
    //   return;
    // }
    if(this.data.video_list[0].weseeLink == '' && this.data.video_list[1].weseeLink == '' && this.data.video_list[2].weseeLink == ''){
      publicFun.getToast('请至少上传一个视频链接');
      return;
    }
    // if(this.data.video_list[0].videoName == '' && this.data.video_list[1].videoName == '' && this.data.video_list[2].videoName == ''){
    //   publicFun.getToast('请填写视频名称');
    //   return;
    // }
    let data = {
      couponName: this.data.coupon_name,
      imageNum: this.data.id,
      price: this.data.price,
      trem: this.data.date,
      count: this.data.count,
      profit: this.data.profit,
      frequence: this.data.frequence,
      buyFrequence: this.data.buyFrequence,
      value: this.data.face,
      jsonList: JSON.stringify(this.data.video_list),
      status: '0',
      type: this.data.coupon_type,
      roomId: wx.getStorageSync('room_id')
    }
    if(this.data.is_edit == true){
      data.couponId = this.data.couponId;
    }
    editCoupon(data).then((res)=>{
      if(res.code == 200){
        if(this.data.type == 'custom'){
          console.log('自定义保存成功：'+res.data);
          let pages = getCurrentPages(); // 当前页的数据，
          let prevPage = pages[pages.length - 2]; // 上一页的数据
          prevPage.setData({
            is_edit_back: true // 修改上一页的属性值；
          })
          wx.setStorageSync('custom', res.data.imageNum);
        }
        // this.getEditFinish('save');
      }
    })
  },
  submitForm(e){
    if(this.data.from_type == 0){
      if(this.data.coupon_index == null){
        publicFun.getToast('请选择课程类型');
        return;
      }
      if(this.data.date == ''){
        publicFun.getToast('请选择促销券有效时间');
        return;
      }
      if(this.data.count == ''){
        publicFun.getToast('请输入促销券有效次数');
        return;
      }
      // if(this.data.frequence == ''){
      //   publicFun.getToast('请输入促销券使用频率');
      //   return;
      // }
      // if(this.data.frequence < 1){
      //   publicFun.getToast('促销券使用频率不能小于1小时');
      //   return;
      // }
    }
    else{
      if(this.data.date == ''){
        publicFun.getToast('请选择代金券有效时间');
        return;
      }
      if(this.data.count == ''){
        publicFun.getToast('请输入代金券有效次数');
        return;
      }
      // if(this.data.frequence == ''){
      //   publicFun.getToast('请输入代金券使用频率');
      //   return;
      // }
    }
    if(this.data.video_list[0].weseeLink == '' && this.data.video_list[1].weseeLink == '' && this.data.video_list[2].weseeLink == ''){
      publicFun.getToast('请至少上传一个视频链接');
      return;
    }
    for(let i in this.data.video_list){
      if(this.data.video_list[i].weseeLink.indexOf('challenge') != '-1'){
        // 微视挑战类型视频转换
        let cs_id = this.data.video_list[i].weseeLink.split('&')[0].split('=')[1];
        let all_cs = this.data.video_list[i].weseeLink.split('?')[1];
        this.data.video_list[i].weseeLink = 'https://h5.weishi.qq.com/weishi/feed/'+ cs_id + '/wsfeed?' + all_cs
      }
	  
      if(this.data.video_list[i].weseeLink.indexOf('isee.weishi') != '-1'){
        // 微视isee类型视频转换
        let cs_id = this.data.video_list[i].weseeLink.split('&')[1].split('=')[1];
        let all_cs = this.data.video_list[i].weseeLink.split('?')[1];
        this.data.video_list[i].weseeLink = 'https://h5.weishi.qq.com/weishi/feed/'+ cs_id + '/wsfeed?' + all_cs
      }
    }
    // if(this.data.video_list[0].videoName == '' && this.data.video_list[1].videoName == '' && this.data.video_list[2].videoName == ''){
    //   publicFun.getToast('请填写视频名称');
    //   return;
    // }
    let data = {
      roomId: wx.getStorageSync('room_id'),
      couponType: this.data.couponTypes[this.data.coupon_index].name,
      couponName: this.data.coupon_name,
      imageNum: this.data.id,
      price: this.data.price,
      trem: this.data.date,
      count: this.data.count,
      profit: this.data.profit,
      frequence: this.data.frequence,
      buyFrequence: this.data.buyFrequence,
      value: this.data.face,
      jsonList: JSON.stringify(this.data.video_list),
      status: '1',
      type: this.data.coupon_type,
    }
    if(this.data.is_edit == true){
      data.couponId = this.data.couponId;
    }
    publishCoupon(data).then((res)=>{
      if(res.code == 200){
        let video_list = [{sort: 1,videoName: '',weseeLink: ''},{sort: 2,videoName: '',weseeLink: ''},{sort: 3,videoName: '',weseeLink: ''}];
        this.setData({
          coupon_name: '',
          price: '',
          date: '',
          date_txt: this.data.from_type==0?'请选择促销券有效时间':'请选择代金券有效时间',
          count: '',
          profit: '',
          frequence: '',
          buyFrequence: '',
          face: '',
          video_list: video_list
        })
        publicFun.getToast('发行成功');
        if(this.data.type == 'custom'){
          wx.removeStorageSync('custom');
        }
        setTimeout(()=>{
          wx.navigateBack({
            delta: 1
          })
        },1500)
      }
    })
  }
})