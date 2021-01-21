// pages/huiyibang/houseList/index.js
import {
  queryMenuList,
  updateMenu,
  startMenu,
  endProgram,
  updateOrder,
  delMenu,
  query_company_code_type,
  pushMenuVideoLinkToCodeType,
  getVideoList,
  awardCoupon,
  giveDiscount
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
   menu_list: [],
   room_id: '',
   page: 1,
   page1: 1,
   show1: false,
   is_checked: false,
   project_list: [],
   click_idkey: '',//点击的节目idkey
   click_index: '',//点击的节目index
   new_type_id: '',//选择的项目id
   type_count: '',//选择的项目权益数量
   videoLinks: [],
   is_from: '',//是否是观察员  look：是
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.room_id)
    if(options.from){
      this.setData({
        is_from: options.from
      })
    }
    if(options.room_id){
      this.setData({
        room_id: options.room_id
      })
    }
    this.getProjectList();
  },
  getMenuList(){
    queryMenuList({
      roomId: wx.getStorageSync('room_id'),
      pageNo: this.data.page,
      pageSize: 10
    }).then(res=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            menu_list: res.data.records
          })
        }else{
          this.setData({
            menu_list: this.data.menu_list.concat(res.data.records)
          })
        }
      }
    })
  },
  toCreate(){
    wx.navigateTo({
      url: '/pages/huiyibang/addMenu/index'
    })
  },
  getProjectList(){
    query_company_code_type({
      current: this.data.page1,
      size: 20
    }).then((res)=>{
      if(res.code == 200){
        if(this.data.page1 == 1){
          console.log(JSON.stringify(res.data.records))
          if(res.data.records.length == 1){
            this.setData({
              new_type_id: res.data.records[0].typeId
            })
          }
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
  delMenuProject(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "确定要删除该节目嘛？",
      success: function(mos){
        if(mos.confirm){
          delMenu({
            id: id
          }).then((res)=>{
            if(res.code == 200){
              that.getMenuList();
            }
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
    console.log(e.detail.value,this.data.project_list[e.detail.value].typeId,this.data.project_list[e.detail.value].codeNumber)
    this.setData({
      new_type_id: this.data.project_list[e.detail.value].typeId,
      type_count: this.data.project_list[e.detail.value].codeNumber
    })
  },
  onClose1(){
    this.setData({
      show1: false
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
    if(this.data.type_count == 0){
      wx.showToast({
        title: '暂无权益',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    this.sendVideo();
  },
  sendVideo(){
    let videoList = [];
    for(let i=0;i<this.data.videoLinks.length;i++){
      videoList[i]=this.data.videoLinks[i].videoLink
      console.log('this.data.new_type_id----'+this.data.new_type_id)
      pushMenuVideoLinkToCodeType({
        link: videoList[i],
        sort: i+1,
        typeId: this.data.new_type_id,
        status: 1
      }).then((res)=>{
        if(res.code == 200){
          console.log(JSON.stringify(res))
        }
      })
    }
    startMenu({
      roomId: wx.getStorageSync('room_id'),
      menuId: this.data.click_idkey
    }).then((resg)=>{
      if(resg.code == 200){
        // for(let i in this.data.menu_list){
        //   if(this.data.menu_list[i].status == 1 && this.data.click_index != i){
        //     this.changeStatus(this.data.menu_list[i].idKey,2);
        //   }
        // }
        this.getMenuList();
      }
    })
    this.setData({
      show1: false
    })
  },
  getVideoList(){
    getVideoList({
      roomId: wx.getStorageSync('room_id'),
      menuId: this.data.click_idkey
    }).then((res)=>{
      if(res.code == 200){
        if(res.data != null){
          this.setData({
            videoLinks: res.data.records
          })
          if(this.data.project_list.length == 1){
            this.setData({
              new_type_id: this.data.project_list[0].typeId,
              type_count: this.data.project_list[0].codeNumber,
              show1: false
            })
            this.sendVideo();
          }else{
            this.setData({
              show1: true
            })
          }
        }
      }
    })
  },
  operating(e){
    let that = this;
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    let list = ['修改','删除','上移','下移'];
    wx.showActionSheet({
      itemList: list,
      success: function(res){
        if(res.tapIndex == 0){
          that.changeHouse(item);
        }else if(res.tapIndex == 1){
          that.deleteHouse(item.idKey);
        }else if(res.tapIndex == 2){
          if(index == 0){
            return;
          }
          that.changeOrder(item.idKey,that.data.menu_list[index-1].startTime,that.data.menu_list[index-1].endTime);
        }else{
          if(index == that.data.menu_list.length-1){
            return;
          }
          that.changeOrder(item.idKey,that.data.menu_list[index+1].startTime,that.data.menu_list[index+1].endTime);
        }
      }
    })
  },
  start(e){
    let item = e.currentTarget.dataset.item;
    let index = e.currentTarget.dataset.index;
    this.setData({
      click_idkey: item.idKey,
      click_index: index
    })
    this.getVideoList();
    // this.changeStatus(item.idKey,1);
  },
  ending(e){
    let item = e.currentTarget.dataset.item;
    wx.showModal({
      title: "提示",
      content: "确定要结束吗？",
      success: (res)=>{
        if(res.confirm){
          endProgram({
            menuId: item.idKey
          }).then((res)=>{
            if(res.code == 200){
              this.getMenuList();
            }
          })
        }
      }
    })
    // this.changeStatus(item.idKey,2);
  },
  lookVideo(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/qinqinhehe/videoInterests/index?type=2',
    })
    // wx.navigateTo({
    //   url: '/pages/huiyibang/videoList/index?item='+encodeURIComponent(JSON.stringify(item))
    // })
  },
  changeOrder(id,startTime,endTime){
    updateOrder({
      keyId: id,
      startTime: startTime,
      endTime: endTime
    }).then((res)=>{
      if(res.code == 200){
        this.getMenuList();
      }
    })
  },
  changeStatus(id,status){
    updateMenu({
      roomId: wx.getStorageSync('room_id'),
      idKey: id,
      status: status
    }).then((res)=>{
      if(res.code == 200){
        publicFun.getToast('修改成功');
        this.setData({
          page: 1
        })
        this.getMenuList();
      }
    })
  },
  changeHouse(item){
    wx.navigateTo({
      url: '/pages/huiyibang/addMenu/index?item='+encodeURIComponent(JSON.stringify(item))
    })
  },
  deleteHouse(id){
    wx.showModal({
      title: "提示",
      content: "确定要删除吗？",
      success: (res)=>{
        if(res.confirm){
          delMenu({
            id: id
          }).then((res)=>{
            if(res.code == 200){
              this.setData({
                page: 1
              })
              this.getMenuList();
            }
          })
        }
      }
    })
  },
  toMenuPage(){
    wx.navigateTo({
      url: '/pages/huiyibang/menu/index'
    })
  },
  toVote(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: '/pages/huiyibang/lottery/index?from=0&menuId='+item.idKey+'&type='+item.type
    })
  },
  toSend(e){
    let item = e.currentTarget.dataset.item;
    // 赠送代金券
    giveDiscount({
      menuId: item.idKey
    }).then((res)=>{
      if(res.code == 200){
        wx.showModal({
          title: "提示",
          content: "赠送成功，已经有"+res.data+"人获得此代金券",
          showCancel: false
        })
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
    this.getMenuList();
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
    // this.data.page++;
    // this.setData({
    //   page: this.data.page
    // })
    // this.getMenuList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})