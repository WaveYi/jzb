// pages/huiyibang/videoList/index.js
import {
  getVideoList,
  delVideo
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menu_id: '',
    video_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.item){
      let item = JSON.parse(decodeURIComponent(options.item));
      this.setData({
        menu_id: item.idKey
      })
    }
  },
  getVideoList(){
    getVideoList({
      roomId: wx.getStorageSync('room_id'),
      menuId: this.data.menu_id
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          video_list: res.data.records
        })
      }
    })
  },
  toCreate(){
    wx.navigateTo({
      url: '/pages/huiyibang/addVideo/index?menu_id='+this.data.menu_id
    })
  },
  changeVideo(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/addVideo/index?menu_id='+this.data.menu_id+'&item='+encodeURIComponent(JSON.stringify(item))
    })
  },
  deleteVideo(e){
    let item = e.currentTarget.dataset.item;
    wx.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: (res)=>{
        if(res.confirm){
          delVideo({
            id: item.idKey
          }).then((res)=>{
            if(res.code == 200){
              this.setData({
                page: 1
              })
              this.getVideoList();
            }
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getVideoList();
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