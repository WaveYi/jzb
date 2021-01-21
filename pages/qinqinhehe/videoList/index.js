// pages/videoList/index.js
import {
  query_code_video,
  query_company_video_link,
  query_my_video_link
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '',
    type_id: '',
    type_name: '',
    img: '',
    list: [],
    is_my: 0,
    switch1Checked: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    if(options.id){
      this.setData({
        type_id: options.id,
        type_name: options.name
      })
    }
    if(options.is_my){
      this.setData({
        is_my: options.is_my
      })
    }

    let room_id = wx.getStorageSync('room_id');
    let room_role = wx.getStorageSync('room_role'+room_id);
    this.setData({
      type: room_role
    })
    console.log('----视频房间身份role----'+room_role)
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getVideoList(this.data.type_id);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getVideoList(id){
    if(this.data.is_my == 0){
      let identity = wx.getStorageSync('userInfo').type;
      console.log(identity,this.data.type)
      if(identity == 1){
        query_code_video({
          typeId: id
        }).then((res)=>{
          if(res.code == 200){
            this.setData({
              list: res.data
            })
          }
        })
      }else if(identity != 1 && (this.data.type == 1 || this.data.type == 2)){
        query_company_video_link({
          typeId: id
        }).then((res)=>{
          if(res.code == 200){
            this.setData({
              list: res.data
            })
          }
        })
      }
    }else{
      query_my_video_link({
        codeId: id
      }).then((res)=>{
        if(res.code == 200){
          this.setData({
            list: res.data
          })
        }
      })
    }
  },
  toAddVideo(){
    wx.navigateTo({
      url: '/pages/qinqinhehe/addVideo/index?into=add&is_my='+this.data.is_my+'&id='+this.data.type_id+'&type='+this.data.type
    })
  },
  changeVideo(e){
    let link = e.currentTarget.dataset.link;
    let sort = e.currentTarget.dataset.sort;
    let video_id = e.currentTarget.dataset.vid;
    console.log(video_id)
    let status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: '/pages/qinqinhehe/addVideo/index?into=change&is_my='+this.data.is_my+'&id='+this.data.type_id+'&type='+this.data.type+'&sort='+sort+'&video_id='+video_id+'&status='+status+'&link='+encodeURIComponent(JSON.stringify(link))
    })
  },
  playVideo(e){
    let link = e.currentTarget.dataset.link;
    wx.removeStorageSync('video_url');
    wx.setStorageSync('video_url', link);
    wx.navigateTo({
      url: '/pages/qinqinhehe/video/index'
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

  }
})