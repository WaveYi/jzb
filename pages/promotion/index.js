// pages/promotion/index.js
import {
  getInfo,
  appRole,
  shoWEditCouponList,
  query_editcoupon_list,
  getAgentCouponList,
  queryAllCouponAgentList,
  addCouponAgentList,
  query_boss_publish_coupon,
  queryAgentCouponList,
  editCoupon,
  addCouponAgent,
  queryCouponSellList,
  queryAllCouponSellList,
  queryCouponUseList,
  queryCouponUseList2,
  querySellCouponList,
  couponConsume,
  couponSell,
  queryBusinessInfo,
  queryBusinessImg,
  getSessinKey,
  update_phone,
  update_user_info,
  delCoupon,
  delCouponAgent,
  changeUserType,
  hasUserType,
  my_business_list,
  addAgentCoupon,
  addCouponAgentByScan
} from '../../api/user.js'
import { base64src } from '../../utils/base64src.js'
import publicFun from '../../utils/public.js'
// var requestUrl = 'http://192.168.1.2:8094'
var requestUrl = 'https://e.3p3.top'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},//用户信息
    avatar: '/assets/avatar.svg',
    name: '',
    phone: '',
    coupon_id: '',
    is_home: true,
    identity: '',//boss agent seller 
    id_title: '',
    promotion_list: [],
    coupon_list: [],
    coupon_custom_list: [],
    issued_list: [],
    is_list: 0, //0: 编辑列表   1：发行列表
    index: '',
    page: 1,
    pages: 1,
    status: 1,
    is_pass: 0,
    is_issue: 0,
    back_img: '',
    shangjia_img: '',
    dataStr: '',
    consumerId: '',
    is_click: true,  //是否点击我的商家按钮
    has_user: 0,
    myBusinessList: [],
    bus_index: 0,
    select_bossId: '',
    select_business: '',
    custom_isNull: true,  //自定义促销券是否为空
    is_edit_back: false,  //编辑促销券保存返回
    is_coupon: 0,//是否是代金券  0：促销券  1：代金券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo');
    let identity = wx.getStorageSync('room_role'+wx.getStorageSync('room_id'));
    let back_img = wx.getStorageSync('back_img');
    console.log(identity)
    this.setData({
      userInfo: userInfo,
      identity: identity,
      back_img: back_img
    })
    this.toMyHouse();
    // this.userInfo();
    // var that = this;
    //查看促销券出售数量(老板)
    // queryAllCouponSellList({
    //   pageNum: 1,
    //   pageSize: 5
    // }).then(res=>{})
    
    // let promotion_list = [
    //   {icon: '/assets/nav_icon9.png',title: '我当销售员'},
    //   {icon: '/assets/nav_icon8.png',title: '我做代理人'},
    //   {icon: '/assets/nav_icon6.png',title: '我发促销券'}
    // ]
    // that.setData({
    //   promotion_list: promotion_list,
    //   is_click: false
    // })
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
    // this.setData({
    //   is_home: true,
    //   is_issue: 0
    // })
    var that = this;
    console.log(that.data.is_edit_back)
    if(that.data.is_edit_back == true){
      that.setData({
        page: 1,
        coupon_list: [],
        coupon_custom_list: []
      })
      that.getCouponList();
      that.getCouponCustomList();
    }

    wx.checkSession({
      success () {
        console.log('登录未过期');
        wx.setStorageSync('check', 1)
        //session_key 未过期，并且在本生命周期一直有效
        hasUserType().then((ress)=>{
          if(ress.code == 200){
            that.setData({
              has_user: ress.data
            })
          }
        })
        queryBusinessInfo().then((res)=>{
          if(res.code == 200){
            console.log(JSON.stringify(res.data.status))
            if(res.data.status == '待审批'){
              that.setData({
                is_pass: 1
              })
            }else{
              that.setData({
                is_pass: 0
              })
            }
          }
        })
        
        getInfo().then(res=>{
          if(res.code == 200){
            that.setData({
              // promotion_list: promotion_list,
              // id_title: id_title,
              avatar: res.data.headPortraitLink,
              name: res.data.nickname,
              phone: res.data.phone
              // identity: res.data.type
            })
            if(that.data.identity == 0 || that.data.identity == 3){
              that.getMyBusinessList();
            }
          }
        }).catch(err=>{
        })
      },
      fail () {
        console.log('登录已过期');
        wx.removeStorageSync('check')
        // session_key 已经失效，需要重新执行登录流程
      }
    })
  },
  getUserLogin(){
    this.onShow();
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
    wx.getSavedFileList({
      success: (res) => {
        res.fileList.forEach((val,key) => {
          wx.removeSavedFile({
            filePath: val.filePath
          })
        })
      }
    })
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
  userInfo() {
    wx.getUserInfo({
      success: (res) => {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        this.setData({
          avatar: userInfo.avatarUrl,
          name: userInfo.nickName
        })
      }
    })
  },
  bindPickerChange(e){
    let index = e.detail.value;
    this.setData({
      select_bossId: this.data.myBusinessList[index].bossId,
      select_business: this.data.myBusinessList[index].businessName
    })
  },
  getMyBusinessList(){
    my_business_list().then((res)=>{
      if(res.data.length == 0){
        this.setData({
          select_bossId: ''
        })
        return;
      }
      if(res.code == 200){
        this.setData({
          myBusinessList: res.data,
          select_bossId: res.data[0].bossId,
          select_business: res.data[0].businessName
        })
        // queryBusinessImg({
        //   bossId: res.data[0].bossId
        // }).then((res)=>{
        //   if(res.code == 200){
        //     this.setData({
        //       shangjia_img: res.data
        //     })
        //   }
        // })
      }
    })
  },
  getCouponList(){
    // 查看可编辑的促销券列表(老板)
    shoWEditCouponList({
      pageNum: this.data.page,
      pageSize: 5
    }).then(ress=>{
      if(ress.code == 200){
        let coupon_list = [];
        for(let i in ress.data){
          let random = Math.floor(Math.random()*99999999);
          let base64 = "data:image/png;base64," + ress.data[i];
          base64src(base64,i,image=>{
            this.data.coupon_list.push({
              id: i,
              src: image
            })
            this.setData({
              coupon_list: this.data.coupon_list,
              pages: ress.data.pages
            })
          })
        }
      }
    })
  },
  getCouponCustomList(){
    // 自定义促销券列表
    query_editcoupon_list({
      pageNum: this.data.page,
      pageSize: 5
    }).then((res)=>{
      if(res.code == 200){
        if(res.data.total != 0){
          this.setData({
            custom_isNull: false
          })
        }else{
          this.setData({
            custom_isNull: true
          })
        }
        for(let i in res.data.records){
          let item = res.data.records[i];
          let base64 = "data:image/png;base64," + item.image;
          base64src(base64,item.couponId,image=>{
            this.data.coupon_custom_list.push({
              id: item.couponId,
              src: image,
              couponName: item.couponName,
              imageNum: item.imageNum
            })
            this.setData({
              coupon_custom_list: this.data.coupon_custom_list
            })
          })
        }
        // if(this.data.page == 1){
        //   this.setData({
        //     coupon_custom_list: res.data.records
        //   })
        // }else{
        //   this.setData({
        //     coupon_custom_list: this.data.coupon_custom_list.concat(res.data.records)
        //   })
        // }
      }
    })
  },
  lookTemplate(){
    this.data.custom_isNull = !this.data.custom_isNull;
    console.log(this.data.custom_isNull);
    this.setData({
      custom_isNull: this.data.custom_isNull
    })
  },
  getCouponList1(){
    // 查看可发行的促销券列表(代理人)
    query_boss_publish_coupon({
      pageNum: this.data.page,
      pageSize: 5,
      // bossId: wx.getStorageSync('boss_id'),//this.data.select_bossId
      userId: wx.getStorageSync('userInfo').unionId,
      type: 0,
      roomId: wx.getStorageSync('room_id')
    }).then(res=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            coupon_list: res.data
          })
        }else{
          this.setData({
            coupon_list: this.data.coupon_list.concat(res.data)
          })
        }
      }
    })
  },
  getDjqList(boss_id){
    // 查看已发行的促销券列表(老板)
    let data ={
      status: 1,
      bossId: boss_id,
      pageNum: this.data.page,
      pageSize: 5
    }
    addCouponAgentList(data).then(res=>{
      console.log('----代金券数据----'+JSON.stringify(res))
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            issued_list: res.data
          })
        }else{
          this.setData({
            issued_list: this.data.issued_list.concat(res.data)
          })
        }
      }
    })
  },
  getIssuedList(status,coupon){
    // 查看已发行的促销券列表(老板)
    let data ={
      status: status,
      userId: wx.getStorageSync('userInfo').unionId,
      pageNum: this.data.page,
      // type: coupon,
      pageSize: 5
    }
    if(coupon == 0){
      data.roomId = wx.getStorageSync('room_id')
    }
    if(this.data.identity == 2){
      data.userId = wx.getStorageSync('compereUserId')
    }
    query_boss_publish_coupon(data).then(res=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            issued_list: res.data
          })
        }else{
          this.setData({
            issued_list: this.data.issued_list.concat(res.data)
          })
        }
      }
    })
  },
  getIssuedList1(status){
    // 查看已发行的促销券列表(代理人)
    let data = {
      status: status,//1:当前  0:回顾
      pageNum: this.data.page,
      pageSize: 5,
      userId: wx.getStorageSync('userInfo').unionId,
      type: 0,
      // bossId: wx.getStorageSync('boss_id'),//this.data.select_bossId
      roomId: wx.getStorageSync('room_id')
    }
    queryAgentCouponList(data).then(res=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            issued_list: res.data
          })
        }else{
          this.setData({
            issued_list: this.data.issued_list.concat(res.data)
          })
        }
        // for(let i in res.data.records){
        //   let random = Math.floor(Math.random()*99999999);
        //   let item = res.data.records[i];
        //   let base64 = "data:image/png;base64," + item.rqcode;
        //   let issued_list = [];
        //   base64src(base64,item.couponId,ress=>{
        //     this.data.issued_list.push({
        //       id: item.couponId,
        //       src: ress,
        //       certId: item.certId,
        //       couponName: item.couponName
        //     });
        //     this.setData({
        //       issued_list: this.data.issued_list,
        //       pages: res.data.pages
        //     })
        //   })
        // }
      }
    })
  },
  // 编辑列表分页
  getCouponMore(e){
    if(this.data.page <= this.data.pages){
      this.data.page++;
      this.setData({
        page: this.data.page
      })
      if(this.data.identity == '1'){
        this.getCouponList();
      }
      if(this.data.identity == '0' || this.data.identity == '3'){
        this.getCouponList1();
      }
    }
  },
  getCouponCustomMore(e){
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    this.getCouponCustomList();
  },
  // 发行列表分页
  getIssuedMore(e){
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    if(this.data.identity == '1'){
      this.getIssuedList(this.data.status,this.data.is_coupon);
    }
    if(this.data.identity == '0' || this.data.identity == '3'){
      this.getIssuedList1(this.data.status);
    }
  },
  // 点击导航触发事件
  getListClick(e){
    console.log(e.detail)
    console.log(this.data.identity);
    this.setData({
      index: e.detail.index
    })
    // if(this.data.is_click == true){
      if(this.data.identity ==  1){
        if(e.detail.index == 0){
          this.selectUserCoupon(0);
          // this.setData({
          //   page: 1,
          //   is_list: 0,
          //   is_home: false,
          //   coupon_list: [],
          //   coupon_custom_list: []
          // })
          // console.log(this.data.is_list)
          // this.getCouponList();
          // this.getCouponCustomList();
        }
        if(e.detail.index == 1){
          this.setData({
            page: 1,
            is_list: 1,
            status: 1,
            is_home: false,
            is_issue: 1,
            issued_list: [],
            is_coupon: 0
          })
          this.getIssuedList(1,0);
          return;
          wx.navigateTo({
            url: '/pages/mySeller/index'
          })
        }
        if(e.detail.index == 2){
          // 教师券发行
          this.setData({
            page: 1,
            is_list: 1,
            status: 1,
            is_home: false,
            is_issue: 1,
            issued_list: [],
            is_coupon: 0
          })
          this.getIssuedList(1,1);
          return;
          var that = this;
          if(wx.getStorageSync('user_boss_id')){
            that.setData({
              page: 1,
              is_list: 1,
              status: 1,
              is_home: false,
              is_issue: 1,
              issued_list: [],
              is_coupon: 1
            })
            that.getDjqList(wx.getStorageSync('user_boss_id'));
          }else{
            wx.scanCode({
              
              success (res) {
                console.log('---扫码返回的参数---'+res.result);
                wx.setStorageSync('user_boss_id',res.result);
                that.setData({
                  page: 1,
                  is_list: 1,
                  status: 1,
                  is_home: false,
                  is_issue: 1,
                  issued_list: [],
                  is_coupon: 1
                })
                that.getDjqList(wx.getStorageSync('user_boss_id'));
              }
            })
          }
          return;
          // 代金券代理
          var that = this;
          wx.scanCode({
            
            success (res) {
              console.log('扫码返回的参数1'+JSON.stringify(res.result));
              // let data = wx.getQueryString({
              //   url: res.result,
              //   name: "data"
              // });
              let data = res.result.replace("https://h.3p3.top?data=","");
              let dataStr = data.split('&')[0];
              console.log('扫码返回的参数2'+dataStr);
              addCouponAgentByScan({
                data: dataStr
              }).then(ress=>{
                console.log("----代金券代理----"+JSON.stringify(ress))
                if(ress.code == 200){
                  wx.showModal({
                    title: "提示",
                    content: "代理成功",
                    showCancel: false
                  })
                }
              })
            }
          })
        }
        if(e.detail.index == 3){
          // 代金券编辑
          // this.selectUserCoupon(1);
        }
        if(e.detail.index == 4){
          // 代金券发行
          this.setData({
            page: 1,
            is_list: 1,
            status: 1,
            is_home: false,
            is_issue: 1,
            issued_list: [],
            is_coupon: 1
          })
          this.getIssuedList(1,1);
        }
        return;
        if(e.detail.index == 2){
          // 促销券回顾
          wx.navigateTo({
            url: '/pages/profitList/index?type=boss',
          })
          // this.setData({
          //   page: 1,
          //   is_list: 1,
          //   is_home: false,
          //   status: 0,
          //   issued_list: []
          // })
          // console.log(this.data.is_list)
          // this.getIssuedList(0);
        }
        if(e.detail.index == 3){
          this.setData({
            page: 1,
            is_list: 1,
            status: 1,
            is_home: false,
            is_issue: 1,
            issued_list: []
          })
          this.getIssuedList(1);
        }
        if(e.detail.index == 4){
          wx.navigateTo({
            url: '/pages/myAgent/index'
          })
        }
        if(e.detail.index == 5){
          //促销券收益（查看促销券出售数量）--老板
          wx.navigateTo({
            url: '/pages/profitList/index?type=boss'
          })
          // queryAllCouponSellList({
          //   pageNum: this.data.page,
          //   pageSize: 5
          // }).then(res=>{

          // })
        }
        if(e.detail.index == 6){
          //搜索代理人
          wx.navigateTo({
            url: '/pages/search/index?type=boss'
          })
        }
      }else if(this.data.identity == 2){
        // if(e.detail.index == 0){
        //   // 代金券代理
        //   var that = this;
        //   wx.scanCode({
        //     
        //     success (res) {
        //       console.log('扫码返回的参数1'+JSON.stringify(res.result));
        //       // let data = wx.getQueryString({
        //       //   url: res.result,
        //       //   name: "data"
        //       // });
        //       let data = res.result.replace("https://h.3p3.top?data=","");
        //       let dataStr = data.split('&')[0];
        //       console.log('扫码返回的参数2'+dataStr);
        //       addCouponAgentByScan({
        //         data: dataStr
        //       }).then(ress=>{
        //         console.log("----代金券代理----"+JSON.stringify(ress))
        //         if(ress.code == 200){
        //           wx.showModal({
        //             title: "提示",
        //             content: "代理成功",
        //             showCancel: false
        //           })
        //         }
        //       })
        //     }
        //   })
        // }else 
        if(e.detail.index == 0){
          // 代金券发行
          this.setData({
            page: 1,
            is_list: 1,
            status: 1,
            is_home: false,
            is_issue: 1,
            issued_list: [],
            is_coupon: 1
          })
          this.getIssuedList(1,1);
        }
      }else if(this.data.identity == 0 || this.data.identity == 3){
        if(e.detail.index == 0){
          // 促销券收藏
          this.setData({
            page: 1,
            is_list: 0,
            is_home: false,
            coupon_list: []
          })
          this.getCouponList1();
        }
        if(e.detail.index == 1){
          // 促销券再发行
          this.setData({
            page: 1,
            is_list: 1,
            is_home: false,
            status: 1,
            issued_list: []
          })
          this.getIssuedList1(1);
        }
        if(e.detail.index == 2){
          // 促销券回顾
          wx.navigateTo({
            url: '/pages/profitDetail/index?type=agent&bossId='+this.data.select_bossId
          })
          // this.setData({
          //   page: 1,
          //   is_list: 1,
          //   is_home: false,
          //   status: 0,
          //   issued_list: []
          // })
          // this.getIssuedList1(0);
        }
        if(e.detail.index == 3){
          // 促销券收益
          wx.navigateTo({
            url: '/pages/profitDetail/index?type=agent&bossId='+this.data.select_bossId
          })
          //查看促销券出售数量(代理人)
          // queryCouponSellList({
          //   pageNum: this.data.page,
          //   pageSize: 5
          // }).then((res)=>{
            
          // })
        }
        if(e.detail.index == 4){
          //搜索商家
          wx.navigateTo({
            url: '/pages/search/index?type=agent'
          })
        }
      }else if(this.data.identity == 'seller'){
        // 销售员
        if(e.detail.index == 0){
          // 销售
          var that = this;
          wx.scanCode({
            
            success(res) {
              console.log('扫码返回的参数: '+res.result);
              console.log('截取字符串后：'+res.result.replace("https://p.3p3.top?data=",""))
              // console.log(res.result.length)
              that.setData({
                dataStr: res.result.replace("https://q.3p3.top?data=","")
              })
              // let data = wx.getQueryString({
              //   url: res.result,
              //   name: "data"
              // });
              // that.setData({
              //   dataStr: data
              // })
              // if(res.result.length == 28){
              //   that.setData({
              //     consumerId: res.result
              //   })
              // }else{
                
              // }
              // && that.data.consumerId != ''
              if(that.data.dataStr != ''){
                console.log('请求的参数：'+that.data.dataStr);
                couponSell({
                  data: that.data.dataStr//要购买的促销劵二维码
                }).then(resg=>{
                  console.log('出售成功：'+JSON.stringify(resg));
                  if(resg.code == 200){
                    // console.log(JSON.stringify(resg));
                    that.setData({
                      dataStr: ''
                    })
                    wx.showModal({
                      title: "提示",
                      content: "出售成功！",
                      showCancel: false
                    })
                  }
                })
              }
              // console.log('扫码返回的参数2'+data);
            }
          })
        }
        if(e.detail.index == 1){
          // 验证
          var that = this;
          wx.scanCode({
            
            success (res) {
              console.log('扫码返回的参数1'+JSON.stringify(res.result));
              // let data = wx.getQueryString({
              //   url: res.result,
              //   name: "data"
              // });
              let data = res.result.replace("https://p.3p3.top?data=","");
              console.log('扫码返回的参数2'+JSON.stringify(data));
              couponConsume({
                param: data
              }).then((resg)=>{
                if(resg.code == 200){
                  wx.showModal({
                    title: "提示",
                    content: "验证成功！",
                    showCancel: false
                  })
                }
              })
            }
          })
        }
        if(e.detail.index == 2){
          // 收入详情
          wx.navigateTo({
            url: '/pages/profitDetail/index?type=seller&index=0',
          })
          // querySellCouponList({
          //   pageNum: this.data.page,
          //   pageSize: 5
          // }).then((res)=>{
            
          // })
        }
        if(e.detail.index == 3){
          // 折让详情
          wx.navigateTo({
            url: '/pages/profitDetail/index?type=seller&index=1',
          })
          // queryCouponUseList2({
          //   pageNum: this.data.page,
          //   pageSize: 5
          // }).then((res)=>{
            
          // })
        }
      }
  },
  getOnShow(){
    this.onShow();
  },
  updateToken(){
    var that = this;
    update_user_info().then((res)=>{
      if(res.code == 200){
        wx.setStorageSync('token', res.data.token);
        var id_title = '';
        // var back_img = '../../assets/indexBackground.png';
        // var promotion_list = [
        //   {icon: '/assets/nav_icon9.png',title: '我当销售员'},
        //   {icon: '/assets/nav_icon8.png',title: '我做代理人'},
        //   {icon: '/assets/nav_icon6.png',title: '我发促销券'}
        // ]
        that.setData({
          is_home: true,
          is_click: false,
          id_title: '',
          // back_img: back_img,
          // promotion_list: promotion_list
        })
        that.onShow();
      }
    })
  },
  getUserPhone(e){
    var that = this;
    wx.getNetworkType({
      success (res) {
        if(res.networkType == 'unknown' || res.networkType == 'none'){
          wx.showToast({
            title: '请检查网络状态',
            icon: 'none'
          })
          return;
        }
      }
    })
    wx.login({
      success: (resg) => {
        getSessinKey(resg.code).then(skres => {
          update_phone({
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv,
            sessionKey: skres.data.sessionKey
          }).then((upres)=>{
            if(upres.code == 200){
              wx.setStorageSync('token', upres.data.token);
              that.onShow();
            }
          })
        })
      }
    })
  },
  scanCode() {
    wx.scanCode({
      success(res) {
        console.log('扫码返回的参数'+res.result);
        // let data = wx.getQueryString({
        //   url: res.result,
        //   name: "data"
        // });
        let data = res.result.replace("https://p.3p3.top?data=","");
        wx.setStorage({
          data: data,
          key: 'params',
        })
        wx.navigateTo({
          url: '/pages/demo/index?data=' + data
        })
      }
    })
  },
  // 下载图片  
  downFile(url){  
    const _this = this;  
    wx.downloadFile({
      url: url,
      success: (ress) => {
        if (ress.statusCode === 200) {
          console.log(ress.tempFilePath);
          wx.saveImageToPhotosAlbum({
            filePath: ress.tempFilePath,
            success: (downImg)=> { 
              console.log(downImg);
            },
          })
        }
      }
    })
  },
  selectCoupon(e){
    let index = e.currentTarget.dataset.index;
    console.log(index)
    if(this.data.identity == 1){
      if(this.data.index == 0){
        // 促销券编辑
        if(this.data.custom_isNull == true){
          wx.navigateTo({
            url: '/pages/editCoupon/index?id='+this.data.coupon_list[index].coupon_id
          })
        }else{
          wx.navigateTo({
            url: '/pages/editCoupon/index?id='+this.data.coupon_custom_list[index].imageNum
          })
        }
      }
      if(this.data.index == 1 || this.data.index == 2){
        // +'&certId='+this.data.issued_list[index].certId
        wx.navigateTo({
          url: '/pages/couponDetail/index?src='+this.data.issued_list[index].imageNum+'&id='+this.data.issued_list[index].idKey
        })
      }
    }else if(this.data.identity == '0' || this.data.identity == '3'){
      if(this.data.index == 0){
        // 促销券编辑
        wx.navigateTo({
          url: '/pages/bossCouponDetail/index?id='+this.data.coupon_list[index].coupon_id
        })
      }
      if(this.data.index == 1){
        // +'&certId='+this.data.issued_list[index].certId
        wx.navigateTo({
          url: '/pages/couponDetail/index?src='+this.data.issued_list[index].imageNum+'&id='+this.data.issued_list[index].idKey
        })
      }
    }
  },
  toUser(){
    if(this.data.is_home == true){
      wx.navigateBack({
        delta: 1
      })
      // if(wx.getStorageSync('check') == 1){
      //   // wx.navigateTo({
      //   //   url: '/pages/userInfo/index',
      //   // })
        
      // }else{
      //   wx.showToast({
      //     title: '请先登录',
      //     icon: 'none'
      //   })
      // }
    }else{
      this.setData({
        is_home: true,
        is_issue: 0
      })
    }
  },
  toIssue(){
    wx.navigateTo({
      url: '/pages/editIssue/index'
    })
  },
  toMyHouse(){
    var promotion_list = [];
    var id_title = '';
    var identity = this.data.identity;
    var is_click = !this.data.is_click;
    var back_img = '';

    // if(is_click){
      // queryBusinessImg({
      //   bossId: this.data.select_bossId
      // }).then((res)=>{
      //   if(res.code == 200){
      //     this.setData({
      //       shangjia_img: res.data
      //     })
      //   }
      // })
      // back_img = this.data.shangjia_img;
    console.log(identity)
    if(identity == 1){
      // 老板
      id_title = '老板';
      promotion_list = [
        {icon: '/assets/nav_icon2.png',title: '促销券编辑'},
        // {icon: '/assets/nav_icon9.png',title: '我的销售员'},
        // {icon: '/assets/nav_icon3.png',title: '促销券回顾'},
        {icon: '/assets/nav_icon6.png',title: '促销券发行'},
        // {icon: '/assets/nav_icon1.png',title: '代金券代理'},
        // {icon: '/assets/nav_icon2.png',title: '代金券编辑'},
        // {icon: '/assets/nav_icon6.png',title: '教师券发行'},
        // {icon: '/assets/nav_icon8.png',title: '我的代理人'},
        // {icon: '/assets/nav_icon7.png',title: '促销券收益'},
        // {icon: '/assets/search.svg',title: '搜索代理人'}
      ]
    }else if(identity == 2){
      // 主持人
      id_title = '老板';
      promotion_list = [
        // {icon: '/assets/nav_icon1.png',title: '代金券代理'},
        {icon: '/assets/nav_icon6.png',title: '代金券发行'},
      ]
    }else if(identity == 0 || identity == 3){
      // 代理人
      id_title = '代理人';
      promotion_list = [
        {icon: '/assets/nav_icon1.png',title: '促销券收藏'},
        {icon: '/assets/nav_icon6.png',title: '促销券再发行'},
        // {icon: '/assets/nav_icon3.png',title: '促销券回顾'},
        // {icon: '/assets/nav_icon7.png',title: '促销券收益'},
        // {icon: '/assets/search.svg',title: '搜索商家'}
      ]
    }else if(identity == 'seller'){
      // 销售员
      id_title = '销售员';
      promotion_list = [
        {icon: '/assets/nav_icon4.png',title: '促销券销售'},
        {icon: '/assets/nav_icon5.png',title: '促销券验证'},
        {icon: '/assets/nav_icon3.png',title: '促销券收入'},
        {icon: '/assets/nav_icon7.png',title: '促销券折让'}
      ]
    }
    this.setData({
      promotion_list: promotion_list,
      id_title: id_title,
      is_click: is_click,
      // back_img: back_img,
      is_home: true
    })
  },
  selectUserCoupon(from_type){
    console.log(wx.getStorageSync('custom'));
    // if(wx.getStorageSync('custom')){
    //   wx.navigateTo({
    //     url: '/pages/editCoupon/index?type=custom&id='+wx.getStorageSync('custom'),
    //   })
    // }else{
      publicFun.getImage(1,false,['album']).then((res)=>{
        console.log('----自定义上传促销券----：'+res[0]);
        wx.showLoading({
          title: '加载中'
        })
        wx.uploadFile({
          url: requestUrl + '/applet/file/upload', //仅为示例，非真实的接口地址
          filePath: res[0],
          name: 'file',
          header: {
            'Authentication': wx.getStorageSync('token')
          },
          formData:{
            type: 'cp'
          },
          success (imgRes){
            console.log('----自定义上传促销券----2：'+JSON.stringify(imgRes.data));
            console.log(JSON.parse(imgRes.data).msg);
            if(JSON.parse(imgRes.data).code == 200){
              wx.hideLoading();
              wx.navigateTo({
                url: '/pages/editCoupon/index?type=custom&id='+JSON.parse(imgRes.data).data+'&from_type='+from_type
              })
            }else{
              wx.showModal({
                title: "提示",
                content: JSON.parse(imgRes.data).msg || JSON.parse(imgRes.data).message,
                showCancel: false
              })
            }
          }
        })
      })
    // }
  },
  delEditCoupon(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除该促销券？',
      success (res){
        if(res.confirm){
          if(that.data.identity == 'boss'){
            delCoupon({
              couponId: that.data.coupon_list[index].id
            }).then((resp)=>{
              if(resp.code == 200){
                publicFun.getToast(resp.code);
                that.setData({
                  page: 1,
                  is_list: 1,
                  status: 1,
                  is_home: false,
                  coupon_list: []
                })
                that.getCouponList();
              }
            })
          }
        }
      }
    })
  },
  delCoupon(e){
    var that = this;
    let index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '确定删除该促销券？',
      success (res){
        if(res.confirm){
          if(that.data.identity == 'boss'){
            delCoupon({
              couponId: that.data.issued_list[index].couponId
            }).then((resp)=>{
              if(resp.code == 200){
                publicFun.getToast(resp.code);
                that.data.issued_list.splice(index,1);
                that.setData({
                  is_list: 1,
                  status: 1,
                  is_home: false,
                  issued_list: that.data.issued_list
                })
                // that.getIssuedList(1);
              }
            })
          }
          if(that.data.identity == 'agent'){
            delCouponAgent({
              certId: that.data.issued_list[index].id
            }).then((resp)=>{
              if(resp.code == 200){
                publicFun.getToast(resp.code);
                that.data.issued_list.splice(index,1);
                that.setData({
                  is_list: 1,
                  status: 1,
                  is_home: false,
                  issued_list: that.data.issued_list
                })
                // that.getIssuedList1(1);
              }
            })
          }
        }
      }
    })
  },
  changeIdentity(){
    var that = this;
    wx.showActionSheet({
      itemList: ['老板','代理人','销售员','消费者'],
      success (res){
        console.log(res.tapIndex);
        var id_type = '';
        if(res.tapIndex == 0){
          id_type = 'boss';
        }else if(res.tapIndex == 1){
          id_type = 'agent';
        }else if(res.tapIndex == 2){
          id_type = 'seller';
        }else{
          id_type = '';
        }
        changeUserType({
          type: id_type
        }).then((res)=>{
          if(res.code == 200){
            that.updateToken();
            hasUserType().then((ress)=>{
              if(ress.code == 200){
                that.setData({
                  has_user: ress.data
                })
              }
            })
          }
        })
      }
    })
  }
})