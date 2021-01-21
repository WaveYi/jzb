// pages/huiyibang/lottery/index.js
import {
  getProgramJoinList,
  deleteProgramJoin,
  queryRegistr,
  getProgramJoin,
  getProgramjoinStatus,
  getRegistrList,
  addWinner
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    menu_id: '',
    bg: "",
    // 老虎机抽奖显示1,隐藏2
    luckDrawID: 1,
    // 抽奖button状态
    drawId: 1,
    showDefault: false,
    itemImgs: [{
      id: 1,
      url: ""
    }, {
      id: 2,
      url: ""
    }, {
      id: 3,
      url: ""
    }],
    tab1: { // 第一列当前显示的图片
      id: 1,
      url: ""
    },
    tab2: { // 第二列当前显示的图片
      id: 2,
      url: ""
    },
    tab3: { // 第三列当前显示的图片
      id: 3,
      url: ""
    },
    animationData: null, // 绑定的动画效果
    animationData1: {}, // 第一列动画
    animationData2: {}, // 第二列动画
    animationData3: {}, // 第三列动画
    // 保存结果，将每一列的结果保存下来，如果有三个值，，说明摇奖结束
    resNum: [],
    vote_person: [],//抽奖人
    voteInfo: {},//中奖人信息
    vote_type: null
  },
  /* 
   *初始化加载数据
   */
  onLoad(options) {
    

    if(options.menuId){
      this.setData({
        menu_id: options.menuId
      })
    }
    
    if(options.type == 1){
      // 节目关注抽奖
      this.setData({
        vote_type: 1
      })
      this.getVotePerson();
    }else{
      // 参与者抽奖
      this.setData({
        vote_type: 3
      })
      this.getRegistrList();
    }
    // let data = {
    //   userId: userInfo.unionId,
    //   menuId: this.data.menu_id,
    //   roomId: wx.getStorageSync('room_id')
    // }
    // getVoteList(data).then(res=>{
    //   if(res.code == 200){
        
    //   }
    // })
  },
  startScroll(){
    let animation = wx.createAnimation({
      duration: 3000,
      timingFunction: 'ease'
    })
    // 获取元素总高度
    let height = 0;
    if(this.data.vote_person.length != 0){
      height = (this.data.vote_person.length - 1) * 100
    }
    // 向上移动
    animation.translateY(-height).step()
    // 将动画效果赋值
    this.setData({
      animationData: animation.export()
    })
  },
  getRegistrList(){
    getRegistrList({
      roomId: wx.getStorageSync('room_id')
    }).then((res)=>{
      if(res.code == 200){
        this.setData({
          vote_person: res.data
        })
      }
    })
  },
  getVotePerson(){
    let userInfo = wx.getStorageSync('userInfo');
    let data = {
      menuId: this.data.menu_id,
      roomId: wx.getStorageSync('room_id')
    }
    getProgramjoinStatus(data).then(res=>{
      if(res.code == 200){
        this.setData({
          vote_person: res.data
        })
      }
    })
  },
  /* 
   *"抽奖点击事件"
   */
  getAnmiation: function() {
    this.setData({
      drawId: 2
    })
    if(this.data.vote_person.length == 0){
      wx.showToast({
        title: '抽奖人数不够',
        icon: 'none',
        duration: 1500
      })
      return;
    }

    // 随即生成0-10之间的数，0-2：结果为1,3-5：结果为2,6-8：结果为3,8-10：不中奖
    let randomNum = parseInt(Math.random() * this.data.vote_person.length);
 
    console.log(randomNum)
    this.startScroll();
    var page = this;
    setTimeout(()=>{
      var switchId = page.data.vote_person[randomNum].idKey;
      var switchName = '';
        console.log(page.data.vote_type)
        if(page.data.vote_type == 1){
          // 关注者抽奖
          getProgramjoinStatus({
            userId: page.data.vote_person[randomNum].userId,
            menuId: page.data.menu_id,
            roomId: wx.getStorageSync('room_id')
          }).then((res)=>{
            if(res.code == 200){
              switchName = res.data[0].userName;
              let voteInfo = res.data[0];
              if(voteInfo.phone){
                voteInfo.phone = voteInfo.phone.substr(0,3)+"****"+voteInfo.phone.substr(7);
              }
              if(voteInfo.name){
                voteInfo.name = page.formatName(voteInfo.name);
              }
              
              page.setData({
                voteInfo: voteInfo,
                showDefault: true,
                drawId: 2
              })
  
              // 添加中奖人信息
              addWinner({
                roomId: wx.getStorageSync('room_id'),
                menuId: page.data.menu_id,
                userId: voteInfo.userId
              }).then((ress)=>{
                if(ress.code == 200){
                  deleteProgramJoin({
                    id: switchId
                  }).then((resd)=>{
                    if(resd.code == 200){
                      page.getVotePerson();
                    }
                  })
                }
              })
              // wx.showModal({
              //   title: '提示',
              //   content: "中奖人："+switchName
              // })
            }
          })
        }else{
          // 参与者抽奖
          queryRegistr({
            userId: page.data.vote_person[randomNum].userId
          }).then((res)=>{
            if(res.code == 200){
              switchName = res.data.nickname;
              let voteInfo = res.data;
              if(voteInfo.phone){
                voteInfo.phone = voteInfo.phone.substr(0,3)+"****"+voteInfo.phone.substr(7);
              }
              if(voteInfo.name){
                voteInfo.name = page.formatName(voteInfo.name);
              }
              
              page.setData({
                voteInfo: voteInfo,
                showDefault: true,
                drawId: 2
              })
  
              // 添加中奖人信息
              addWinner({
                roomId: wx.getStorageSync('room_id'),
                menuId: page.data.menu_id,
                userId: voteInfo.userId
              }).then((ress)=>{
                if(ress.code == 200){
                  deleteProgramJoin({
                    id: switchId
                  }).then((resd)=>{
                    if(resd.code == 200){
                      page.getVotePerson();
                    }
                  })
                }
              })
              // wx.showModal({
              //   title: '提示',
              //   content: "中奖人："+switchName
              // })
            }
          })
        }
    },3000)
  },
  formatName(name) { 
  let newStr; 
  if (name.length === 2) { 
    newStr = name.substr(0, 1) + '*'; 
  } else if (name.length > 2) { 
    let char = ''; 
    for (let i = 0, len = name.length - 2; i < len; i++) { 
      char += '*'; 
    } 
    newStr = name.substr(0, 1) + char + name.substr(-1, 1);
    } else { 
      newStr = name;
    } 
    return newStr; 
  },
  /**
   * 处理动画动作
   */
  getOpenAnimation: function(line, resNum) {
    var page = this;
    // 创建动画
    let animation = wx.createAnimation({
      duration: 300, // 执行一次动画的时间
      timingFunction: 'ease', // 动画的效果，平滑
    })
 
    // 随即生成摇奖区滚动的总共时长，范围5000-6000
    let randomTotalTime = Math.random() * 1000 + 5000;
    randomTotalTime = parseInt(randomTotalTime, 10);
 
    // 随即生成每次循环间隔的时间,500-600之间的随机数
    let tempRandom = Math.random() * 300 + 250;
    tempRandom = parseInt(tempRandom, 10);
 
    let num = 0; // 设定计数标签，从0开始
    let count = 1; // 循环计数
    // 设定循环
    let loop = setInterval(function() {
      num++; // 每次循环加1
      count++;
      if (num > 2) {
        // 如果计数标签大于2，置为0
        num = 0;
      }
      if (count * tempRandom >= randomTotalTime) {
        // 到达预定的时间点，停止循环，将图片定位到显示区域中间位置
        animation.translateY(5).step({
          duration: 0,
          timingFunction: 'ease'
        });
        handleSet(page);
 
        if (resNum >= 0 && resNum < 3) {
          num = 0;
        } else if (resNum >= 3 && resNum < 6) {
          num = 1;
        } else if (resNum >= 6 && resNum < 9) {
          num = 2;
        }
 
        handleSet(page);
        count = 0;
        // 更新结果数组
        let tempArr = page.data.resNum;
        tempArr.push(num);
        page.setData({
          resNum: tempArr
        })
        clearInterval(loop); // 停止循环
      } else {
        let height = Math.floor(page.data.vote_person.length/2)*80;
        console.log('---height---'+height)
        animation.translateY(-height).step({
          duration: 500,
          timingFunction: 'linear'
        });
        handleSet(page);
      }
 
      function handleSet(page) {
        if (line === 1) {
          page.setData({
            tab1: page.data.itemImgs[num], // 修改显示的图片
            animationData1: animation.export()
          })
        } else if (line === 2) {
          page.setData({
            tab2: page.data.itemImgs[num], // 修改显示的图片
            animationData2: animation.export()
          })
        } else if (line === 3) {
          page.setData({
            tab3: page.data.itemImgs[num], // 修改显示的图片
            animationData3: animation.export()
          })
        }
      }
    }, tempRandom);
  },
  /**
   * getBack[返回首页]
   */
  getBack: function() {
    wx.reLaunch({
      url: '../index/index',
    })
 
  },
  /**
   * getOrderbase[查看订单]]
   */
  getOrderbase: function() {
    wx.reLaunch({
      url: '/pages/order/index',
    })
  },
  /**
   * 已经抽奖
   */
  btnDisable: function() {
    if(this.data.vote_person.length == 0){
      wx.showToast({
        title: '抽奖人数不够',
        icon: 'none',
        duration: 1500
      })
      return;
    }
    wx.showToast({
      title: '您已经抽过奖了',
      icon: "none",
      duration: 2000
    })
  },
})