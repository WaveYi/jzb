// pages/addVideo/index.js
import {
  update_code_video_list,
  addnCodeVideo,
  updateCodeVideo,
  update_company_video,
  update_my_code_link
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sort: '',
    type: '',
    type_id: '',
    video_id: null,
    status: '1',
    is_status: true,
    weseeLink: '',
    is_disable: false,
    into: '',  //add 添加  change 修改
    is_my: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.id){
      this.setData({
        type_id: options.id
      })
    }
    console.log(options.is_my)
    if(options.is_my){
      this.setData({
        is_my: options.is_my
      })
    }
    if(options.type){
      this.setData({
        type: options.type
      })
    }
    if(options.video_id){
      this.setData({
        video_id: options.video_id
      })
    }
    if(options.status){
      this.setData({
        status: options.status
      })
    }
    if(options.link){
      this.setData({
        sort: options.sort,
        is_disable: true
        // weseeLink: JSON.parse(decodeURIComponent(options.link))
      })
    }
    if(options.into){
      this.setData({
        into: options.into
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

  },
  switch1Change(e){
    console.log(e.detail.value)
    if(e.detail.value == true){
      this.data.status = 1;
    }else{
      this.data.status = 2;
    }
    this.setData({
      status: this.data.status
    })
    console.log(this.data.status)
  },
  changeSort(e){
    this.setData({
      sort: e.detail.value
    })
  },
  getVideoUrl(e){
    this.setData({
      weseeLink: e.detail.value
    })
  },
  addOrChangeVideo(){
    if(this.data.sort == ''){
      publicFun.getToast('请输入视频序号');
      return;
    }
    if(this.data.weseeLink == ''){
      publicFun.getToast('请输入视频链接');
      return;
    }
    if(this.data.weseeLink.indexOf('challenge') != '-1'){
      // 微视挑战类型视频转换
      let cs_id = this.data.weseeLink.split('&')[0].split('=')[1];
      let all_cs = this.data.weseeLink.split('?')[1];
      this.data.weseeLink = 'https://h5.weishi.qq.com/weishi/feed/'+ cs_id + '/wsfeed?' + all_cs
    }
    if(this.data.weseeLink.indexOf('isee.weishi') != '-1'){
      // 微视isee类型视频转换
      let cs_id = this.data.weseeLink.split('&')[1].split('=')[1];
      let all_cs = this.data.weseeLink.split('?')[1];
      this.data.weseeLink = 'https://h5.weishi.qq.com/weishi/feed/'+ cs_id + '/wsfeed?' + all_cs
    }
    if(this.data.is_my == 0){
      console.log(this.data.type)
      let identity = wx.getStorageSync('userInfo').type;
      console.log(identity,this.data.type)
      if(identity == 1){
        let data = {
          sort: this.data.sort,
          videoId: this.data.video_id,
          typeId: this.data.type_id,
          weseeLink: this.data.weseeLink,
          status: this.data.status
        }
        update_code_video_list(data).then((res)=>{
          if(res.code == 200){
            this.setData({
              sort: '',
              weseeLink: ''
            })
            if(this.data.into == 'add'){
              publicFun.getToast('添加成功');
            }else{
              publicFun.getToast('修改成功');
            }
            setTimeout(()=>{
              wx.navigateBack()
            },1500)
          }
        })
      }
      if(identity != 1 && (this.data.type == 1 || this.data.type == 2 || this.data.type == 7)){
        let data = {
          sort: this.data.sort,
          videoId: this.data.video_id,
          typeId: this.data.type_id,
          link: this.data.weseeLink,
          status: this.data.status
        }
        update_company_video(data).then((res)=>{
          if(res.code == 200){
            this.setData({
              sort: '',
              weseeLink: ''
            })
            if(this.data.into == 'add'){
              publicFun.getToast('添加成功');
            }else{
              publicFun.getToast('修改成功');
            }
            setTimeout(()=>{
              wx.navigateBack()
            },1500)
          }
        })
      }
    }else if(this.data.is_my == 2){
      update_my_code_link({
        sort: this.data.sort,
        codeId: this.data.type_id,
        link: this.data.weseeLink,
        videoId: this.data.video_id,
        status: this.data.status
      }).then((res)=>{
        if(res.code == 200){
          this.setData({
            sort: '',
            weseeLink: ''
          })
          if(this.data.into == 'add'){
            publicFun.getToast('添加成功');
          }else{
            publicFun.getToast('修改成功');
          }
          setTimeout(()=>{
            wx.navigateBack()
          },1500)
        }
      })
    }else{
      // 我的权益列表进来
      update_my_code_link({
        sort: this.data.sort,
        codeId: this.data.type_id,
        link: this.data.weseeLink,
        videoId: this.data.video_id,
        status: this.data.status
      }).then((res)=>{
        if(res.code == 200){
          this.setData({
            sort: '',
            weseeLink: ''
          })
          if(this.data.into == 'add'){
            publicFun.getToast('添加成功');
          }else{
            publicFun.getToast('修改成功');
          }
          setTimeout(()=>{
            wx.navigateBack()
          },1500)
        }
      })
    }
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