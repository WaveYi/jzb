// pages/myStaff/index.js
import {
  query_company_member,
  member_manage
} from '../../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_list: ["申请人员","在职人员"],
    activeIndex: 0,
    staffList: [],
    type: '',
    page: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.type){
      this.setData({
        type: options.type
      })
    }
    this.getCompanyStaff();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  clickNav(e){
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    })
    this.getCompanyStaff(this.data.activeIndex)
  },
  getCompanyStaff(){
    query_company_member({
      current: this.data.page,
      size: 20,
      status: this.data.activeIndex
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            staffList: res.data.records
          })
        }else{
          this.setData({
            staffList: this.data.staffList.concat(res.data.records)
          })
        }
      }
    })
  },
  clickAgree(e){
    member_manage({
      memberId: e.currentTarget.dataset.id,
      status: '1'
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '已通过',
          icon: 'none'
        })
        let index = e.currentTarget.dataset.index;
        this.data.staffList[index].status = '通过';
        this.setData({
          staffList: this.data.staffList
        })
        this.getCompanyStaff();
      }
    })
  },
  clickReject(e){
    member_manage({
      memberId: e.currentTarget.dataset.id,
      status: '2'
    }).then((res)=>{
      if(res.code == 200){
        wx.showToast({
          title: '已拒绝',
          icon: 'none'
        })
        let index = e.currentTarget.dataset.index;
        this.data.staffList[index].status = '未通过';
        this.setData({
          staffList: this.data.staffList
        })
        this.getCompanyStaff();
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
          member_manage({
            memberId: e.currentTarget.dataset.id,
            status: '3'
          }).then((res)=>{
            if(res.code == 200){
              wx.showToast({
                title: '已删除',
                icon: 'none'
              })
              that.data.staffList.splice(index,1);
              that.setData({
                staffList: that.data.staffList
              })
              // setTimeout(()=>{
              //   that.getAgent();
              // },1500)
            }
          })
        }
      }
    })
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    this.getCompanyStaff();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})