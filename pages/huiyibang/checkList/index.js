// pages/huiyibang/houseList/index.js
import {
  getRegistrList,
  delRegistr,
  updateRegistr
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getRegisterList(){
    getRegistrList({}).then(res=>{
      if(res.code == 200){
        this.setData({
          check_list: res.data
        })
      }
    })
  },
  toCreate(){
    wx.navigateTo({
      url: '/pages/huiyibang/addCheck/index'
    })
  },
  operating(e){
    let that = this;
    let item = e.currentTarget.dataset.item;
    wx.showActionSheet({
      itemList: ['修改','删除','开始','结束'],
      success: function(res){
        if(res.tapIndex == 0){
          that.changeHouse(item);
        }else if(res.tapIndex == 1){
          that.deleteHouse(item.idKey);
        }else if(res.tapIndex == 2){
          that.changeStatus(item.idKey,1);
        }else{
          that.changeStatus(item.idKey,2);
        }
      }
    })
  },
  changeStatus(id,status){
    updateById({
      idKey: id,
      status: status
    }).then((res)=>{
      if(res.code == 200){
        publicFun.getToast('修改成功');
        this.getRegistrList();
      }
    })
  },
  changeHouse(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/addCheck/index?item='+encodeURIComponent(JSON.stringify(item))
    })
  },
  deleteHouse(e){
    wx.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: (res)=>{
        if(res.confirm){
          delRegistr({
            id: e.currentTarget.dataset.id
          }).then((res)=>{
            if(res.code == 200){
              this.getRegistrList();
            }
          })
        }
      }
    })
  },
  toMenuPage(e){
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/huiyibang/meeting/index?room_id='+this.data.house_list[index].idKey
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
    this.getRegistrList();
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