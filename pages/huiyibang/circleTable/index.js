// pages/circleTable/index.js
import * as echarts from '../../../components/ec-canvas/echarts';
import {
  queryUserPositionSalesVolume
} from '../../../api/user.js'
var Chart = null;
var dataList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [{}],
    ec: {
      lazyLoad: true // 延迟加载
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.piechartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getData(){
    queryUserPositionSalesVolume({}).then((res)=>{
      if(res.code == 200){
        if(res.data[0] != null){
          for(let i in res.data){
            //出货量
            this.data.dataList.push({
              value: res.data[i].salesVolume, 
              name: res.data[i].userPosition
            })
          }

          this.setData({
            dataList: this.data.dataList
          })
          this.init_echarts();

          console.log(this.data.dataList)
        }else{
          this.setData({
            dataList: []
          })
        }
      }
    })
  },
  //初始化图表
  init_echarts: function () {
    this.piechartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: 3
      });
      Chart.setOption(this.getOption());
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });
  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption(){
    var option = {
      title: {
        text: '品种销售报表',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
      },
      // legend: {
      //   orient: 'vertical',
      //   left: 'left',
      //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      // },
      series: [
        {
          name: '销售量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: this.data.dataList,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option;
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