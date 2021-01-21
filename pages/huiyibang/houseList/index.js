// pages/huiyibang/houseList/index.js
import {
  getMeetingList,
  deleteById,
  updateById,
  getRoomRoleUserList
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id: '',
    identidy: '',
    house_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id: wx.getStorageSync('userInfo').unionId,
      identidy: wx.getStorageSync('userInfo').type
    })
  },
  getMeetingList(){
    getMeetingList({
      userId: wx.getStorageSync('userInfo').unionId
    }).then(res=>{
      if(res.code == 200){
        this.setData({
          house_list: res.data
        })
      }
    })
  },
  toCreate(){
    if(wx.getStorageSync('check') == 1){
      wx.navigateTo({
        url: '/pages/huiyibang/createMeeting/index'
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
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
        this.getMeetingList();
      }
    })
  },
  changeHouse(e){
    if(wx.getStorageSync('check') != 1){
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return;
    }
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/merchant/index?item='+encodeURIComponent(JSON.stringify(item))
    })
  },
  deleteHouse(e){
    if(wx.getStorageSync('check') != 1){
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return;
    }
    wx.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: (res)=>{
        if(res.confirm){
          deleteById({
            id: e.currentTarget.dataset.id
          }).then((res)=>{
            if(res.code == 200){
              this.getMeetingList();
            }
          })
        }
      }
    })
  },
  toMenuPage(e){
    if(wx.getStorageSync('check') != 1){
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return;
    }
    let index = e.currentTarget.dataset.index;
    wx.removeStorageSync('room_id');
    wx.removeStorageSync('back_img');
    wx.setStorageSync('room_id', this.data.house_list[index].idKey);
    wx.setStorageSync('back_img', this.data.house_list[index].roomImg)
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
    // this.getTabBar().setData({
    //   selected: 2
    // })
    if(wx.getStorageSync('check')==1){
      this.getUserRoleList();
      this.getMeetingList();
    }
  },
  getUserRoleList(){
    getRoomRoleUserList({
      userId: wx.getStorageSync('userInfo').unionId,
      status: 2
    }).then((res)=>{
      if(res.code == 200){
        for(let i in res.data){
          wx.setStorageSync('room_role'+res.data[i].roomId, res.data[i].roleType);
          console.log(wx.getStorageSync('room_role'+res.data[i].roomId))
        }
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
    wx.removeStorageSync('room_id');
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