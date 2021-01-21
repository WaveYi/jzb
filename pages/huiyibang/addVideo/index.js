// pages/huiyibang/addVideo/index.js
import {
  savaVideo,
  updateVideo
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    menu_id: '',
    name: '',
    videoLink: '',
    is_edit: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      menu_id: options.menu_id
    })
    if(options.item){
      let item = JSON.parse(decodeURIComponent(options.item));
      this.setData({
        id: item.idKey,
        name: item.name?item.name:'',
        videoLink: item.videoLink,
        is_edit: 1
      })
    }
  },
  getInput(e){
    this.setData({
      videoLink: e.detail.value
    })
  },
  getInputVal(e){
    let prams1 = e.target.dataset.key;
    this.setData({
      [prams1]: e.detail.value
    })
  },
  submitForm(e){
    if(this.data.name == ''){
      publicFun.getToast('请输入视频名称');
      return;
    }
    if(this.data.videoLink == ''){
      publicFun.getToast('请输入视频地址');
      return;
    }
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