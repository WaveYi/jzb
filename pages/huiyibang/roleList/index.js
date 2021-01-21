// pages/huiyibang/houseList/index.js
import {
  getRoleList,
  getRoomRoleUserList,
  getCurrentRoomRole,
  updateRole,
  deleteRole
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role_list: [],
    role_type: '0',
    room_role: '',
    is_show_role: false,
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      this.setData({
        role_type: options.type
      })
    }
    this.setData({
      room_role: wx.getStorageSync('room_role'+wx.getStorageSync('room_id'))
    })
    console.log('----room_role----'+this.data.room_role)
    // getRoleList({
    //   roomId: wx.getStorageSync('room_id'),
    //   unionId: wx.getStorageSync('userInfo').unionId
    // }).then((res)=>{
    //   if(res.code == 200){

    //   }
    // })
  },
  getRoleList(){
    let room_id = wx.getStorageSync('room_id');
    let role = null;
    if(wx.getStorageSync('room_role'+room_id) == 1){
      // 老板角色
      role = 2;//主持人
    }else if(wx.getStorageSync('room_role'+room_id) == 2){
      // 主持人角色
      role = 4;//销售员
    }
    let data = {
      roomId: wx.getStorageSync('room_id')
      // roleType: role
    }
    getRoomRoleUserList(data).then(res=>{
      if(res.code == 200){
        if(res.data.length != 0){
          let list = [];
          for(let i in res.data){
            console.log(res.data[i].roleType)
            if(res.data[i].roleType != 0){
              list.push(res.data[i])
            }
          }
          this.setData({
            role_list: list
          })
        }
      }
    })
  },
  getUserRole(){
    // 嘉宾角色
    getRoomRoleUserList({
      userId: wx.getStorageSync('userInfo').unionId,
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        if(res.data.length != 0){
          let list = [];
          for(let i in res.data){
            if(res.data[i].roleType != 0){
              list.push(res.data[i])
            }
          }
          this.setData({
            role_list: list
          })
        }
      }
    })
  },
  toCreate(){
    wx.navigateTo({
      url: '/pages/huiyibang/addRole/index'
    })
  },
  changeRole(id,status){
    updateRole({
      idKey: id,
      status: status
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.role_type == 0){
          this.getUserRole();
        }else{
          this.getRoleList();
        }
      }
    })
  },
  agreeRole(e){
    let item = e.currentTarget.dataset.item;
    this.changeRole(item.idKey,2);
  },
  rejectRole(e){
    let item = e.currentTarget.dataset.item;
    this.changeRole(item.idKey,4);
  },
  deleteRole(e){
    wx.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: (res)=>{
        if(res.confirm){
          deleteRole({
            id: e.currentTarget.dataset.id
          }).then((res)=>{
            if(res.code == 200){
              if(this.data.role_type == 0){
                this.getUserRole();
              }else{
                this.getRoleList();
              }
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
    if(this.data.role_type == 0){
      this.getUserRole();
    }else{
      this.getRoleList();
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