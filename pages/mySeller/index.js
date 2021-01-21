// pages/mySeller/index.js
import {
  queryMemberList,
  getBrowseCert,
  memberManage,
  applicationMemberList
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_list: ["申请人列表","我的销售员"],
    activeIndex: 0,
    list: [],
    page: 1,
    totalPage: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getApply();
  },
  getApply(){
    getBrowseCert({
      context: '销售员申请列表'
    }).then(res=>{
      // 查看申请人列表
      if(res.code == 200){
        applicationMemberList({
          data: res.data,
          pageNum: this.data.page,
          pageSize: 20,
          type: 'seller'
        }).then(ress=>{
          if(ress.code == 200){
            this.setData({
              list: this.data.list.concat(ress.data.records)
            })
          }
        })
      }
    })
  },
  getSeller(){
    queryMemberList({
      pageNum: this.data.page,
      pageSize: 20,
      type: 'seller'
    }).then(res=>{
      if(res.code == 200){
        this.setData({
          list: this.data.list.concat(res.data.records)
        })
      }
    })
  },
  loadMore(e){
    if(this.data.activeIndex == 0){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      this.getApply();
    }else{
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      this.getSeller();
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
  clickNav(e){
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
      list: [],
      page: 1
    })
    if(e.currentTarget.dataset.index == 0){
      this.getApply();
    }else{
      this.getSeller();
    }
  },
  clickAgree(e){
    memberManage({
      memberId: e.currentTarget.dataset.id,
      status: '1',
      type: 'seller'
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '已通过',
          icon: 'none'
        })
        let index = e.currentTarget.dataset.index;
        this.data.list[index].status = '通过';
        this.setData({
          list: this.data.list
        })
        // this.getApply();
      }
    })
  },
  clickReject(e){
    memberManage({
      memberId: e.currentTarget.dataset.id,
      status: '2',
      type: 'seller'
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '已拒绝',
          icon: 'none'
        })
        let index = e.currentTarget.dataset.index;
        this.data.list[index].status = '未通过';
        this.setData({
          list: this.data.list
        })
        // this.getApply();
      }
    })
  },
  clickDelete(e){
    let that = this;
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确认删除该成员?',
      success (res){
        if(res.confirm){
          memberManage({
            memberId: e.currentTarget.dataset.id,
            status: '3',
            type: 'seller'
          }).then((res)=>{
            if(res.code == 200){
              wx.showToast({
                title: '已删除',
                icon: 'none'
              })
              that.data.list.splice(index,1);
              that.setData({
                list: that.data.list
              })
            }
          })
        }
      }
    })
  }
})