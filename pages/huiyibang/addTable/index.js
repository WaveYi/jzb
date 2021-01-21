// pages/merchant/index.js
import {
  createTable,
  updateTable
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '添加桌子信息',
    id: '',
    table_name: '',
    table_number: '',
    table_capacity: [],
    capacity_index: '请选择桌子容量',
    table_position: [{id:0,val:'企业老板'},{id:1,val:'企业高管'},{id:1,val:'企业经理'}],
    position_index: null,
    is_edit: 0,//是否修改进来 0:不是  1:是
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    for(let i=1;i<=15;i++){
      this.data.table_capacity.push(i);
    }
    this.setData({
      table_capacity: this.data.table_capacity
    })

    if(options.item){
      let item = JSON.parse(decodeURIComponent(options.item))
      this.setData({
        title: "修改桌子信息",
        id: item.idKey,
        table_name: item.name,
        table_number: item.number,
        capacity_index: item.capacity,
        position_index: item.position,
        is_edit: 1
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

  },
  bindCapacityChange(e){
    this.setData({
      capacity_index: this.data.table_capacity[e.detail.value]
    })
  },
  bindPickerChange(e){
    this.setData({
      position_index: e.detail.value
    })
  },
  getInputVal(e){
    let prams1 = e.target.dataset.key;
    this.setData({
      [prams1]: e.detail.value
    })
  },
  submitForm(e){
    if(this.data.table_name==''){
      publicFun.getToast('请输入桌子名字')
      return;
    }
    if(this.data.table_number==''){
      publicFun.getToast('请输入桌子编号')
      return;
    }
    if(this.data.capacity_index=='请选择桌子容量'){
      publicFun.getToast('请选择桌子容量')
      return;
    }
    if(this.data.position_index==null){
      publicFun.getToast('请选择桌子职位')
      return;
    }
    let data = {
      roomId: wx.getStorageSync('room_id'),
      name: this.data.table_name,
      number: this.data.table_number,
      capacity: this.data.capacity_index,
      position: this.data.position_index
    }
    if(this.data.is_edit == 1){
      data.idKey = this.data.id;
    }
    if(this.data.is_edit == 0){
      createTable(data).then(res=>{
        if(res.code == 200){
          wx.showModal({
            title: "提示",
            content: "您已经添加，是否继续添加?",
            success: (table_res)=>{
              if(table_res.confirm){
                this.setData({
                  table_name: '',
                  table_number: '',
                  capacity_index: '请选择桌子容量',
                  position_index: null,
                })
              }else{
                wx.navigateBack();
              }
            }
          })
        }
      })
    }else{
      updateTable(data).then(res=>{
        if(res.code == 200){
          publicFun.getToast('修改成功');
          // setTimeout(()=>{
          //   wx.navigateBack();
          // },1500)
        }
      })
    }
  }
})