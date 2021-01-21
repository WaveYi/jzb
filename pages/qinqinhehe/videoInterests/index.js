// pages/videoInterests/index.js
import {
  query_code_type,
  company_query_code_type,
  add_code,
  sell_codes,
  sell_codes_company,
  sell_codes_from_start,
  sell_company_codes_to_company,
  query_codes_count,
  query_company_code_type,
  transfer_company_code_type,
  codeInfoTransferType
} from '../../../api/qqhh_user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    type_id: '',
    click_type_id: '',
    new_type_id: '',
    max: '',
    min: '',
    type_name: '',
    video_list: [],
    project_list: [],
    type: '',//身份类型
    total: '',
    count: '',
    input_count: '',
    start_code: '',
    end_code: '',
    page: 1,
    page1: 1,
    show: false,
    show1: false,
    array: ['输入编号','起始编号'],//,'扫码','按商品选择','按时间选择','按二维码ID选择','按上级用户选择'
    array1: ['转移视频权益','更换视频内容'],
    index: 0,
    index1: 0,
    is_disabled: true,
    select_txt: '视频权益选择',
    edit_txt: '视频权益操作',
    click_transfer: 1,
    is_checked: false,
    identity: '',
    type_idx: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let type = wx.getStorageSync('userInfo').type;
    let room_id = wx.getStorageSync('room_id');
    let type = wx.getStorageSync('room_role'+room_id);
    let identity = wx.getStorageSync('userInfo').type;
    console.log('---房间角色---'+type)
    this.setData({
      type: type,
      identity: identity
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('---identity---'+this.data.identity+'---type---'+this.data.type)
    if(this.data.identity == '1'){
      this.getVideoList();
    }else{
      this.getCompanyVideoList();
      this.getProjectList();
    }
  },
  getVideoList(){
    query_code_type({
      current: this.data.page,
      size: 20,
      userId: wx.getStorageSync('userInfo').unionId
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            video_list: res.data.records,
            project_list: res.data.records
          })
        }else{
          this.setData({
            video_list: this.data.video_list.concat(res.data.records),
            project_list: this.data.project_list.concat(res.data.records)
          })
        }
      }
    })
  },
  getCompanyVideoList(){
    company_query_code_type({
      current: this.data.page,
      size: 20,
      userId: wx.getStorageSync('userInfo').unionId
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            video_list: res.data.records
          })
        }else{
          this.setData({
            video_list: this.data.video_list.concat(res.data.records)
          })
        }
      }
    })
  },
  radioChange(e){
    this.setData({
      type_id: e.detail.value
    })
  },
  clickRadio(e){
    if(this.data.type == '1' || this.data.type == '2'){
      let item = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
      this.setData({
        click_type_id: item.typeId,
        start_code: item.min,
        end_code: item.max,
        type_idx: index
      })
    }
  },
  toAddType(){
    wx.navigateTo({
      url: '/pages/qinqinhehe/addCodeType/index?type='+this.data.type
    })
  },
  toAdd(){
    if(this.data.type_id == ''){
      publicFun.getToast('请勾选权益');
      return;
    }
    add_code({
      typeId: this.data.type_id
    }).then((res)=>{
      if(res.code == 200){
        // publicFun.getToast('已新增100');
        this.setData({
          page: 1
        })
        this.getVideoList();
      }
    })
  },
  toTransfer(){
    if(this.data.type_id == ''){
      publicFun.getToast('请勾选权益');
      return;
    }
    if(this.data.start_code == '空' && this.data.end_code == '空'){
      publicFun.getToast('暂无权益');
      return;
    }
    console.log(this.data.start_code,this.data.end_code,this.data.click_type_id);
    this.setData({
      show: true,
      click_type_id: this.data.click_type_id,
      max: this.data.end_code,
      min: this.data.start_code,
      click_transfer: 0,
      total: this.data.video_list[this.data.type_idx].count
    })
    if(this.data.click_type_id != ''){
      this.getCount();
    }
  },
  next(){
    this.setData({
      show: false,
      show1: true
    })
  },
  getProjectList(){
    query_company_code_type({
      current: this.data.page1,
      size: 20
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page1 == 1){
          this.setData({
            project_list: res.data.records
          })
        }else{
          this.setData({
            project_list: this.data.project_list.concat(res.data.records)
          })
        }
      }
    })
  },
  loadMore(){
    this.data.page1++;
    this.setData({
      page1: this.data.page1
    })
    this.getProjectList();
  },
  selectProject(e){
    console.log(e.detail.value)
    this.setData({
      new_type_id: e.detail.value
    })
  },
  selectConfirm(){
    if(this.data.new_type_id == ''){
      wx.showToast({
        title: '请先选择项目',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    if(this.data.identity == 1){
      // 权益老板项目转移
      codeInfoTransferType({
        oldTypeId: this.data.click_type_id,
        newTypeId: this.data.new_type_id,
        startNum: this.data.start_code,
        endNum: this.data.end_code
      }).then((res)=>{
        if(res.code == 200){
          wx.showModal({
            title: '提示',
            content: '项目转移成功',
            showCancel: false
          })
          this.setData({
            page: 1,
            show1: false,
            start_code: '',
            end_code: '',
            type_id: '',
            click_type_id: '',
            new_type_id: '',
            is_checked: false
          })
          this.getVideoList();
        }
      })
    }else{
      // 农场老板项目转移
      transfer_company_code_type({
        oldTypeId: this.data.click_type_id,
        typeId: this.data.new_type_id,
        start: this.data.start_code,
        end: this.data.end_code
      }).then((res)=>{
        if(res.code == 200){
          wx.showModal({
            title: '提示',
            content: '项目转移成功',
            showCancel: false
          })
          this.setData({
            page: 1,
            show1: false,
            start_code: '',
            end_code: '',
            type_id: '',
            click_type_id: '',
            new_type_id: '',
            is_checked: false
          })
          this.getCompanyVideoList(); 
        }
      })
    }
  },
  showPopup(e) {
    let type_id = e.currentTarget.dataset.id;
    let type_name = e.currentTarget.dataset.name;
    let max = e.currentTarget.dataset.item.max;
    let min = e.currentTarget.dataset.item.min;
    for(let i in this.data.video_list){
      if(this.data.video_list[i].typeId == type_id){
        this.data.total = this.data.video_list[i].count
      }
    }
    let arr = [];
    if(this.data.total == e.currentTarget.dataset.item.count){
      arr = ['转移视频权益','更换视频内容'];
    }else{
      arr = ['转移视频权益'];
    }
    
    this.setData({ 
      show: true,
      click_type_id: type_id,
      type_name: type_name,
      max: max,
      min: min,
      start_code: min,
      end_code: max,
      total: this.data.total,
      click_transfer: 1,
      count: e.currentTarget.dataset.item.count,
      input_count: this.data.total,
      array1: arr
    });
  },
  onClose() {
    this.setData({ 
      show: false,
      edit_txt: '视频权益操作',
      select_txt: '视频权益选择',
      index: 0,
      index1: 0,
      is_disabled: true,
      // start_code: '',
      // end_code: ''
    });
  },
  onClose1(){
    this.setData({
      show1: false
    })
  },
  setTotal(e){
    let arr = [];
    this.data.input_count = e.detail.value;
    if(this.data.input_count == this.data.count){
      arr = ['转移视频权益','更换视频内容'];
    }else{
      arr = ['转移视频权益'];
    }
    this.setData({
      total: e.detail.value,
      input_count: this.data.input_count,
      array1: arr
    })
  },
  setStartCode(e){
    this.setData({
      start_code: e.detail.value
    })
    this.getCount();
  },
  setEndCode(e){
    this.setData({
      end_code: e.detail.value
    })
    this.getCount();
  },
  getCount(){
    query_codes_count({
      typeId: this.data.click_type_id,
      start: this.data.start_code,
      end: this.data.end_code
    }).then((res)=>{
      if(res.code == 200){
        let input_count = res.data;
        let arr = [];
        if(input_count == this.data.count){
          arr = ['转移视频权益','更换视频内容'];
        }else{
          arr = ['转移视频权益'];
        }
        this.setData({
          total: res.data,
          input_count: input_count,
          array1: arr
        })
      }
    })
  },
  bindPickerChange(e){
    this.setData({
      index: e.detail.value,
      select_txt: this.data.array[e.detail.value]
    })
    if(this.data.index == 0){
      // 输入编号
      this.setData({
        start_code: this.data.min,
        end_code: this.data.max,
        is_disabled: true
      })
      this.getCount();
    }else if(this.data.index == 1){
      // 起始编号
      this.setData({
        start_code: this.data.min,
        is_disabled: false
      })
    }else{
      this.setData({
        start_code: '',
        end_code: ''
      })
    }
  },
  bindPickerChange1(e){
    console.log(this.data.start_code,this.data.end_code)
    this.setData({
      index1: e.detail.value,
      edit_txt: this.data.array1[e.detail.value]
    })
    if(this.data.index == 0 && this.data.index1 == 0){
      // 输入编号->转移视频权益
      var that = this;
      wx.scanCode({
        
        success (res) {
		  let data = res.result.replace("https://h.3p3.top?data=","");
          let company_id = JSON.parse(data).bossUnionId;
          let userId = JSON.parse(data).userId;
          console.log("company_id----"+company_id);
          console.log("userId----"+userId);
          if(that.data.identity == '1'){
            sell_codes_from_start({
              bossId: company_id,
              typeId: that.data.click_type_id,
              start: that.data.start_code,
              end: that.data.end_code,
              userId: userId
            }).then((resg)=>{
              if(resg.code == 200){
                wx.showModal({
                  title: '提示',
                  content: '转移权益成功',
                  showCancel: false
                })
                that.setData({
                  page: 1
                })
                that.getVideoList();
              }
            })
          }
          if(that.data.identity != '1' && (that.data.type == '1' || that.data.type == '2')){
            sell_company_codes_to_company({
              bossId: company_id,
              typeId: that.data.click_type_id,
              start: that.data.start_code,
              end: that.data.end_code,
              userId: userId
            }).then((resg1)=>{
              console.log("公司转公司-----"+JSON.stringify(resg1));
              if(resg1.code == 200){
                wx.showModal({
                  title: '提示',
                  content: '转移权益成功',
                  showCancel: false
                })
                that.setData({
                  page: 1
                })
                that.getCompanyVideoList();
              }
            })
          }
        }
      })
    }else if(this.data.index == 1 && this.data.index1 == 0){
      // 起始编号->转移视频权益
      console.log(this.data.max,this.data.min,this.data.click_type_id);
      var that = this;
      wx.scanCode({
        
        success (res) {
		  let data = res.result.replace("https://h.3p3.top?data=","");
          let company_id = JSON.parse(data).bossUnionId;
          let userId = JSON.parse(data).userId;
          console.log("company_id----"+company_id);
          console.log("userId----"+userId);
          if(that.data.identity == '1'){
            sell_codes({
              bossId: company_id,
              start: that.data.min,
              typeId: that.data.click_type_id,
              count: that.data.total,
              userId: userId
            }).then((resg)=>{
              if(resg.code == 200){
                wx.showModal({
                  title: '提示',
                  content: '转移权益成功',
                  showCancel: false
                })
                that.setData({
                  page: 1
                })
                that.getVideoList();
              }
            })
          }
          if(that.data.identity != '1' && (that.data.type == '1' || that.data.type == '2')){
            sell_codes_company({
              bossId: company_id,
              start: that.data.min,
              typeId: that.data.click_type_id,
              count: that.data.total,
              userId: userId
            }).then((resg1)=>{
              console.log("公司转公司-----"+JSON.stringify(resg1));
              if(resg1.code == 200){
                wx.showModal({
                  title: '提示',
                  content: '转移权益成功',
                  showCancel: false
                })
                that.setData({
                  page: 1
                })
                that.getCompanyVideoList();
              }
            })
          }
        }
      })
    }
    if(this.data.index1 == 1){
      // 更换视频内容
      console.log(this.data.click_type_id)
      wx.navigateTo({
        url: '/pages/qinqinhehe/videoList/index?id='+this.data.click_type_id+'&name='+this.data.type_name+'&type='+this.data.type
      })
    }
  },
  downloadImg(e){
    let img = e.currentTarget.dataset.item.img;
    var that = this;
    console.log('下载的图片'+that.data.ticket_img)
    wx.showModal({
      title: '提示',
      content: '确定下载图片？',
      success: function(res) {
        if(res.confirm){
          wx.downloadFile({
            url: img,
            success: (ress) => {
              if (ress.statusCode === 200) {
                console.log(ress.tempFilePath);
                wx.saveImageToPhotosAlbum({
                  filePath: ress.tempFilePath,
                  success: function () { 
                    wx.showModal({
                      title: "提示",
                      content: "下载成功",
                      showCancel: false
                    })
                  }
                })
              }
            },
            fail() {
              wx.openSetting({
                success(settingdata) {
                  if (settingdata.authSetting['scope.writePhotosAlbum']) {
                    console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
                  } else {
                    console.log('获取权限失败，给出不给权限就无法正常使用的提示')
                  }
                }
              })
              publicFun.getToast('下载失败');
            }
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
  onSearch(e){
    console.log(e.detail)
  },
  onCancel(e){

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      show: false
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
    if(this.data.identity == '1'){
      this.getVideoList();
    }else{
      this.getCompanyVideoList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})