import {
  qrCodeFileList,
  weseeAnalysis
} from '../../../api/qrCode.js'
import {
  get_video_link
} from '../../../api/user.js'
Page({
  data: {
    url: "",
    urlLisr: [],
    index: 0
  },
  onLoad(options) {
    console.log('111微信扫码接收'+JSON.stringify(options.q))
    var data = '';
    if(wx.getStorageSync('params')){
      data = wx.getStorageSync('params');
      console.log('扫码接收的参数'+data);
    }else{
      //解析url地址
      // console.log(options.q)
      let newUrl = decodeURIComponent(options.q);
      //获取对应number参数
      data = wx.getQueryString({
        url: newUrl,
        name: "data"
      });
      // let data = res.result.replace("https://h.3p3.top?data=","");
      console.log('222微信扫码接收的参数'+data);
    }
    // let data = wx.getStorageSync('params');
    // console.log('扫码接收的参数'+data);
    get_video_link({
      data: data
    }).then((res)=>{
      console.log('----扫码看视频接口返回----：'+JSON.stringify(res))
      if(res.code == 200){
        let newData = [];
        res.data.forEach(item => {
          newData.push(item)
        })
        this.setData({
          urlLisr: newData,
          url: newData[0]
        })
      }
    })
    return;
    if (options.data) {
      //解析url地址
      let newUrl = decodeURIComponent(options.data);
      //获取对应number参数
      let number = wx.getQueryString({
        url: newUrl,
        name: "number"
      });
      //请求接口
      this.queryVideo(number);
    } else {
      this.queryVideo(options.number);
    }
  },
  onUnload(){
    wx.removeStorageSync('params');
  },
  queryVideo(number) {
    qrCodeFileList({
      quickResponseCodeNumber: number
    }).then(res => {
      console.log()
      let newData = [];
      res.data.forEach(item => {
        if (item.weseeLink && item.weseeLink != "") {
          newData.push(item.weseeLink)
        }
      })
      weseeAnalysis(newData).then(
        response => {
          let newUrl = [];
          response.data.forEach(item => {
            if (item.videoLink && item.videoLink != "") {
              newUrl.push(item.videoLink)
            }
          });
          this.setData({
            urlLisr: newUrl,
            url: newUrl[0]
          });
        }
      )
    })
  },
  nextVideo() {
    if (this.data.index == this.data.urlLisr.length - 1) {
      this.setData({
        index: 0,
        url: this.data.urlLisr[0]
      })
    } else {
      this.setData({
        index: this.data.index + 1,
        url: this.data.urlLisr[this.data.index + 1]
      })
    }
  },
  onClickLeft() {
    wx.switchTab({
      url: '/pages/userInfo/index'
    })
  }
})