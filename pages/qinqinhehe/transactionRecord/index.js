// pages/transactionRecord/index.js
import {
  query_my_code_tran
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    page: 1,
    list: [],
    tab_list: ["显示全部","只显示转入","只显示转出"],
    activeIndex: 0,
    type: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTranList();
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
  clickNav(e){
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      type: e.currentTarget.dataset.index+1,
      page: 1
    })
    this.getTranList()
  },
  getTranList(){
    query_my_code_tran({
      current: this.data.page,
      size: 10,
      type: this.data.type
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
  showList(){

  },
  showIn(){

  },
  showOut(){

  },
  onSearch(e){
    console.log(e.detail)
  },
  onCancel(e){

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
    this.getTranList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})