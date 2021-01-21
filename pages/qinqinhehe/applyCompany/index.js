// pages/applyCompany/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.c_type){
      this.setData({
        type: options.c_type
      })
    }
    
    let roleList = [];
    if(options.c_type == '1'){
      roleList = [{type: "权益生成-生成人",id: '12'},{type: "权益生成-印刷员",id: '13'}];
    }else if(options.c_type == '2'){
      roleList = [{type: "运营传播-代理人",id: '22'},{type: "运营传播-销售员",id: '23'}];
    }else{
      roleList = [{type: "社交演绎-操作员",id: '32'},{type: "社交演绎-执行员",id: '33'}];
    }
    this.setData({
      array: roleList
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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