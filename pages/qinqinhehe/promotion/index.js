// pages/promotion/index.js
import {
  show_user_company_id,
  query_company_img,
  company_sell_code,
  get_company_info
} from '../../../api/qqhh_user.js'
import { base64src } from '../../../utils/base64src.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    back_img: '',// /assets/indexBackground.png
    shangjia_img: '',
    dataStr: '',
    consumerId: '',
    has_user: 0,
    myBusinessList: [],
    bus_index: 0,
    select_bossId: '',
    select_business: '',
    custom_isNull: true,  //自定义促销券是否为空
    is_edit_back: false,  //编辑促销券保存返回
    company_code: '', //公司二维码图片
    show: false,  //显示公司二维码
    backgound_img: '',  //背景图
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userInfo();
    console.log(this.data.identity)

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
    //   selected: 1
    // })
    var that = this;
    let identity = wx.getStorageSync('userInfo').type;
    that.setData({
      identity: identity
    })
    this.toMyHouse();
    wx.checkSession({
      success () {
        console.log('登录未过期');
        wx.setStorageSync('check', 1);
        if(identity != '0'){
          query_company_img().then((res)=>{
            if(res.code == 200){
              that.setData({
                back_img: res.data
              })
            }
          })
        }
        //session_key 未过期，并且在本生命周期一直有效
        // hasUserType().then((ress)=>{
        //   if(ress.code == 200){
        //     that.setData({
        //       has_user: ress.data
        //     })
        //   }
        // })
        
        // getInfo().then(res=>{
        //   if(res.code == 200){
        //     that.setData({
        //       avatar: res.data.headPortraitLink,
        //       name: res.data.nickname,
        //       phone: res.data.phone,
        //       identity: res.data.type
        //     })
        //     if(res.data.type == 'agent'){
        //       that.getMyBusinessList();
        //     }else{
        //       queryBusinessImg({
        //         bossId: ''
        //       }).then((res)=>{
        //         if(res.code == 200){
        //           that.setData({
        //             shangjia_img: res.data
        //           })
        //         }
        //       })
        //     }
        //   }
        // })
      },
      fail () {
        console.log('登录已过期');
        wx.setStorageSync('check', 2);
        wx.setStorageSync('is_login', false);

        let promotion_list = [
          {icon: '/assets/icon/23.png',title: '注册公司'},
          {icon: '/assets/icon/6.png',title: '搜索公司'}
        ]
        that.setData({
          promotion_list: promotion_list
        })
        // session_key 已经失效，需要重新执行登录流程
      }
    })
  },
  getUserLogin(){
    this.onShow();
  },
  showPopup() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
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
  showBossCode(){
    show_user_company_id().then((res)=>{
      if(res.code == 200){
        const base64ImgUrl = "data:image/png;base64," + res.data;
        base64src(base64ImgUrl,'comCode',ress=>{
          this.setData({
            company_code: ress
          })
        })
      }
    })
  },
  // 点击导航触发事件
  getListClick(e){
    this.setData({
      index: e.detail.index
    })
    let index = this.data.index;
    if(this.data.identity == '0' || this.data.identity == ''){
      if(e.detail.index == 0){
        if(wx.getStorageSync('check') == 1){
          // 注册公司
          wx.navigateTo({
            url: '/pages/merchant/index'
          })
        }else{
          // session_key 已经失效，需要重新执行登录流程
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000
          })
        }
      }
      if(e.detail.index == 1){
        if(wx.getStorageSync('check') == 1){
          // 搜索公司
          wx.navigateTo({
            url: '/pages/qinqinhehe/search/index'
          })
        }else{
          // session_key 已经失效，需要重新执行登录流程
          wx.showToast({
            title: '请先登录',
            icon: 'none',
            duration: 2000
          })
        }
      }
    }else if(this.data.identity == '1'){
      // 权益生成-老板
      if(index == 0){
        wx.navigateTo({
          url: '/pages/qinqinhehe/videoInterests/index?type=11'
        })
      }else if(index == 1){
        // 公司转让个人:权益转让
        wx.scanCode({
          
          success (res) {
            console.log('----权益转让二维码data----'+res.result);
            let data = res.result.replace("https://p.3p3.top?data=","");
            company_sell_code({
              data: data
            }).then((resg)=>{
              if(resg.code == 200){
                wx.showModal({
                  title: '提示',
                  content: '权益转让成功',
                  showCancel: false
                })
              }
            })
          }
        })
      }else if(index == 2){
        this.showBossCode();
        this.setData({
          show: true
        })
      }else if(index == 3){
        // 公司信息
        wx.navigateTo({
          url: '/pages/merchant/index?type=edit'
        })
      }else if(index == 4){
        // 公司审批
        wx.navigateTo({
          url: '/pages/qinqinhehe/companyApprove/index'
        })
      }else{
        wx.navigateTo({
          url: '/pages/qinqinhehe/test/index'
        })
      }
    }
    else if(this.data.identity == '2'){
      // 运营传播-老板
      if(index == 0){
        wx.navigateTo({
          url: '/pages/qinqinhehe/videoInterests/index?type=21'
        })
      }else if(index == 1){
        // 公司转让个人:权益转让
        wx.scanCode({
          
          success (res) {
            console.log('----权益转让二维码data----'+res.result);
            let data = res.result.replace("https://p.3p3.top?data=","");
            company_sell_code({
              data: data
            }).then((resg)=>{
              if(resg.code == 200){
                wx.showModal({
                  title: '提示',
                  content: '权益转让成功',
                  showCancel: false
                })
              }
            })
          }
        })
      }else if(index == 2){
        this.showBossCode();
        this.setData({
          show: true
        })
      }else if(index == 3){
        wx.navigateTo({
          url: '/pages/merchant/index?type=edit'
        })
      }else if(index == 4){
        wx.navigateTo({
          url: '/pages/qinqinhehe/memberList/index',
        })
      }else{
        wx.navigateTo({
          url: '/pages/qinqinhehe/test/index'
        })
      }
    }
    else if(this.data.identity == '22' || this.data.identity == '23'){
      if(index == 3){
        wx.navigateTo({
          url: '/pages/memberList/index',
        })
      }
    }
    else if(this.data.identity == '3'){
      // 销售员
      if(index == 0){
        wx.navigateTo({
          url: '/pages/merchant/index?type=edit'
        })
      }else if(index == 1){
        // 验收
        wx.scanCode({
          
          success (res) {
            console.log('----权益转让二维码data----'+res.result);
            let data = res.result.replace("https://p.3p3.top?data=","");
            // company_sell_code({
            //   data: data
            // }).then((resg)=>{
            //   if(resg.code == 200){
            //     wx.showModal({
            //       title: '提示',
            //       content: '权益转让成功',
            //       showCancel: false
            //     })
            //   }
            // })
          }
        })
      }
    }else{
      
    }
  },
  getOnShow(){
    this.onShow();
  },
  getUserPhone(e){
    // var that = this;
    // wx.getNetworkType({
    //   success (res) {
    //     if(res.networkType == 'unknown' || res.networkType == 'none'){
    //       wx.showToast({
    //         title: '请检查网络状态',
    //         icon: 'none'
    //       })
    //       return;
    //     }
    //   }
    // })
    // wx.login({
    //   success: (resg) => {
    //     getSessinKey(resg.code).then(skres => {
    //       update_phone({
    //         encryptedData: e.detail.encryptedData,
    //         iv: e.detail.iv,
    //         sessionKey: skres.data.sessionKey
    //       }).then((upres)=>{
    //         if(upres.code == 200){
    //           wx.setStorageSync('token', upres.data.token);
    //           that.onShow();
    //         }
    //       })
    //     })
    //   }
    // })
  },
  toMyHouse(){
    var promotion_list = [];
    var id_title = '';
    var identity = this.data.identity;
    var is_click = !this.data.is_click;
    var back_img = '';

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
    if(identity == '0'){
      id_title = '';
      promotion_list = [
        {icon: '/assets/icon/23.png',title: '注册公司'},
        {icon: '/assets/icon/6.png',title: '搜索公司'}
      ]
    }else if(identity == '1'){
      id_title = '权益生成-老板';
      promotion_list = [
        {icon: '/assets/icon/1.png',title: '我的视频权益'},
        // {icon: '/assets/icon/3.png',title: '权益交易记录'},
        // {icon: '/assets/icon/4.png',title: '视频权益收益'},
        // {icon: '/assets/icon/2.png',title: '授权发行证书'},
        // {icon: '/assets/icon/5.png',title: '我的员工'},
        // {icon: '/assets/icon/6.png',title: '搜索商家'},
        // {icon: '/assets/icon/7.png',title: '合作列表'},
        {icon: '/assets/icon/22.png',title: '交付消费者'},
        {icon: '/assets/icon/28.png',title: '权益接收'},
        {icon: '/assets/icon/19.png',title: '公司信息'},
        {icon: '/assets/icon/19.png',title: '公司审批'}
      ]
    }else if(identity == '12'){
      id_title = '权益生成-生成人';
      promotion_list = [
        {icon: '/assets/icon/8.png',title: '我的视频权益'},
        {icon: '/assets/icon/3.png',title: '权益交易记录'},
        {icon: '/assets/icon/11.png',title: '验收二维码'},
        {icon: '/assets/icon/9.png',title: '生成二维码'},
        {icon: '/assets/icon/12.png',title: '查看授权发行证书'}
      ]
    }else if(identity == '13'){
      id_title = '权益生成-印刷员';
      promotion_list = [
        {icon: '/assets/icon/8.png',title: '我的视频权益'},
        {icon: '/assets/icon/3.png',title: '权益交易记录'},
        {icon: '/assets/icon/11.png',title: '验证二维码'},
        {icon: '/assets/icon/10.png',title: '激活二维码'},
        {icon: '/assets/icon/26.png',title: '操作记录'}
      ]
    }else if(identity == '2'){
      id_title = '运营传播-老板';
      promotion_list = [
        {icon: '/assets/icon/1.png',title: '视频权益列表'},
        // {icon: '/assets/icon/3.png',title: '权益交易记录'},
        // {icon: '/assets/icon/4.png',title: '视频权益收益'},
        // {icon: '/assets/icon/7.png',title: '合作列表'},
        // {icon: '/assets/icon/5.png',title: '我的员工'},
        {icon: '/assets/icon/22.png',title: '交付消费者'},
        {icon: '/assets/icon/28.png',title: '权益接收'},
        {icon: '/assets/icon/19.png',title: '公司信息'},
        {icon: '/assets/icon/21.png',title: '销售员审批'}
      ]
    }else if(identity == '22'){
      id_title = '运营传播-代理人';
      promotion_list = [
        {icon: '/assets/icon/8.png',title: '视频权益处理'},
        {icon: '/assets/icon/3.png',title: '权益交易记录'},
        {icon: '/assets/icon/4.png',title: '视频权益收益'},
        // {icon: '/assets/icon/27.png',title: '销售员管理'},
        // {icon: '/assets/icon/21.png',title: '申请权益'}
      ]
    }else if(identity == '3'){
      id_title = '运营传播-销售员';
      promotion_list = [
        {icon: '/assets/icon/19.png',title: '公司信息'},
        {icon: '/assets/icon/22.png',title: '验收'},
        // {icon: '/assets/icon/21.png',title: '申请权益'}
      ]
    }else if(identity == '31'){
      id_title = '社交演绎-老板';
      promotion_list = [
        {icon: '/assets/icon/1.png',title: '视频权益列表'},
        // {icon: '/assets/icon/3.png',title: '权益交易记录'},
        // {icon: '/assets/icon/4.png',title: '视频权益收益'},
        // {icon: '/assets/icon/7.png',title: '合作列表'},
        // {icon: '/assets/icon/5.png',title: '我的员工'},
        {icon: '/assets/icon/22.png',title: '交付消费者'},
        {icon: '/assets/icon/28.png',title: '权益接收'},
        {icon: '/assets/icon/19.png',title: '公司信息'}
      ]
    }else if(identity == '32'){
      id_title = '社交演绎-操作员';
      promotion_list = [
        {icon: '/assets/icon/8.png',title: '视频权益处理'},
        {icon: '/assets/icon/3.png',title: '权益交易记录'},
        {icon: '/assets/icon/4.png',title: '视频权益收益'},
        {icon: '/assets/icon/28.png',title: '视频项目核验'}
      ]
    }else if(identity == '33'){
      id_title = '社交演绎-执行员';
      promotion_list = [
        {icon: '/assets/icon/1.png',title: '视频权益列表'},
        {icon: '/assets/icon/3.png',title: '权益交易记录'},
        {icon: '/assets/icon/4.png',title: '视频权益收益'},
        {icon: '/assets/icon/7.png',title: '合作列表'},
        {icon: '/assets/icon/19.png',title: '操作员管理'},
        {icon: '/assets/icon/20.png',title: '权益项目方案'}
      ]
    }else{
      
    }
    this.setData({
      promotion_list: promotion_list,
      id_title: id_title,
      is_click: is_click,
      back_img: back_img,
      is_home: true
    })
  },
  bindPickerChange(e){
    let index = e.detail.value;
    this.setData({
      select_bossId: this.data.myBusinessList[index].bossId,
      select_business: this.data.myBusinessList[index].businessName
    })
  }
})