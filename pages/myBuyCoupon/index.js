// pages/myBuyCoupon/index.js
import {
  query_useless_coupon_list,
  queryMyCouponList,
  queryCouponBrowse,
  sellaccept,
  querySellSuccessCouponList
} from '../../api/user.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 0,//0:可使用 1:无使用次数 2:过期 3:被删除
    page: 1,
    nav_list: ['待接受','已接受','全部'],
    nav_active: 0,
    myBuyCouponList: [],
    is_from_type: 0,//促销券：0   代金券：1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getMyBuyCouponList();
    this.setData({
      is_from_type: options.type
    })
    if(options.type == 1){
      this.setData({
        nav_list: ['待使用','已使用','全部']
      })
    }
  },
  getBrowseList(){
    queryCouponBrowse({
      pageNum: this.data.page,
      pageSize: 20
    }).then(lookres=>{
      if(lookres.code == 200){
        if(this.data.page == 1){
          this.setData({
            myBuyCouponList: lookres.data.records
          })
        }else{
          this.setData({
            myBuyCouponList: this.data.myBuyCouponList.concat(lookres.data.records)
          })
        }
      }
    })
  },
  getBuyList(status){
    let data = {
      pageNum: this.data.page,
      pageSize: 20,
      couponType: 0,
      consumerId: wx.getStorageSync('userInfo').unionId
    }
    if(this.data.is_from_type == 0){
      data.accept = status;
      querySellSuccessCouponList(data).then(lookres=>{
        if(lookres.code == 200){
          if(this.data.page == 1){
            this.setData({
              myBuyCouponList: lookres.data
            })
          }else{
            this.setData({
              myBuyCouponList: this.data.myBuyCouponList.concat(lookres.data)
            })
          }
        }
      })
    }else{
      if(status == 1){
        data.count = 0;
      }
      data.couponType = 1;
      querySellSuccessCouponList(data).then(lookres=>{
        if(lookres.code == 200){
          if(this.data.page == 1){
            this.setData({
              myBuyCouponList: lookres.data
            })
          }else{
            this.setData({
              myBuyCouponList: this.data.myBuyCouponList.concat(lookres.data)
            })
          }
        }
      })
    }
  },
  getBuyList1(){
    let data = {
      pageNum: this.data.page,
      pageSize: 20,
      couponType: 0,
      consumerId: wx.getStorageSync('userInfo').unionId
    }
    if(this.data.is_from_type == 1){
      data.couponType = 1;
    }
    querySellSuccessCouponList(data).then(lookres=>{
      if(lookres.code == 200){
        if(this.data.page == 1){
          this.setData({
            myBuyCouponList: lookres.data
          })
        }else{
          this.setData({
            myBuyCouponList: this.data.myBuyCouponList.concat(lookres.data)
          })
        }
      }
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
    if(this.data.nav_active != 2){
      this.getBuyList(this.data.nav_active);
    }else{
      this.getBuyList1();
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  clickNav(e){
    let index = e.currentTarget.dataset.index;
    this.setData({
      myBuyCouponList: [],
      nav_active: index,
      type: index,
      page: 1
    })
    if(index != 2){
      this.getBuyList(index);
    }else{
      this.getBuyList1();
    }
  },
  getMyBuyCouponList(){
    let data = {
      pageNum: this.data.page,
      pageSize: 20,
      type: this.data.type
    }
    query_useless_coupon_list(data).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            myBuyCouponList: res.data.records
          })
        }else{
          this.setData({
            myBuyCouponList: this.data.myBuyCouponList.concat(res.data.records)
          })
        }
      }
    })
  },
  toDetail(e){
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/couponDetail/index?type=buy&id='+item.couponSellIdKey
    })
    // wx.navigateTo({
    //   url: '/pages/myBuyCouponDetail/index?id='+couponId
    // })
  },
  toAgree(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/addCheck/index?is_from=1&coupon_id='+item.couponSellIdKey+'&room_id='+item.roomId
    })
  },
  toReject(e){
    let that = this;
    let item = e.currentTarget.dataset.item;
    console.log('---item---'+JSON.stringify(item))
    wx.showModal({
      title: "提示",
      content: "确定要拒绝邀请吗？",
      success: function(mos){
        if(mos.confirm){
          sellaccept({
            accept: 2,
            idKey: item.couponSellIdKey
          }).then((res)=>{
            if(res.code == 200){
              that.setData({
                page: 1
              })
              that.getBuyList(0);
            }
          })
        }
      }
    })
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
    this.getBrowseList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})