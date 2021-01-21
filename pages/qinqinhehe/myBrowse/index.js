// pages/myBrowse/index.js
import {
  query_my_code_browse,
  showCodeToSell
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    list: [],
    show: false,
    code_img: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList();
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
  getList(){
    query_my_code_browse({
      current: this.data.page,
      size: 20
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            list: res.data.records
          })
        }else{
          this.setData({
            list: this.data.list.concat(res.data.records)
          })
        }
      }
    })
  },
  clickItem(e){
    let code_id = e.currentTarget.dataset.id;
    this.showCode(code_id);
  },
  showCode(code_id){
    showCodeToSell({
      codeId: code_id
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          code_img: res.data,
          show: true
        })
      }
    })
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    this.getList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})