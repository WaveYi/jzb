// pages/shipment/index.js
import {
  queryUserPositionSalesTendency
} from '../../../api/user.js'
import publicFun from '../../../utils/public.js'
import * as echarts from '../../../components/ec-canvas/echarts';
var Chart = null;
var dataList = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    ec: {
      lazyLoad: true // 延迟加载
    },
    lastMonth: [],
    lastArr: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据
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
  getData(){
    queryUserPositionSalesTendency({}).then((res)=>{
      if(res.code == 200){
        if(res.data[0] != null){
          let x_data = [[],[],[],[]];	
          for(let i in res.data){
            //食堂销售量	
            x_data[0].push(res.data[i].canteenSalesVolume)
            //餐厅销售量		
            x_data[1].push(res.data[i].diningSalesVolume)
            //超市销售量		
            x_data[2].push(res.data[i].shopSalesVolume)
            //入户销售量		
            x_data[3].push(res.data[i].registerSalesVolume)
          }
          for(let i=0;i<4;i++){
            let txt = '';
            if(i==0){
              txt = '食堂销售量';
            }else if(i==1){
              txt = '餐厅销售量';
            }else if(i==2){
              txt = '超市销售量';
            }else{
              txt = '入户销售量';
            }
            this.data.dataList.push({
              name: txt,
              type: 'line',
              smooth: true,
              data: x_data[i]
            })
          }
          
          let date = res.data;
          for(let j in date){
            this.data.lastMonth.push(date[j].date);
          }

          this.setData({
            dataList: this.data.dataList,
            lastMonth: this.data.lastMonth,
            lastArr: this.data.lastMonth
          })

          console.log(this.data.dataList)
        }
        this.init_echarts();
      }
    })
  },
  //初始化图表
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
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
        text: '品种分布趋势图',
        left: 'center'
      },
      // color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      // legend: {
      //   data: ['A', 'B', 'C','D', 'E', 'F','G', 'H', 'I'],
      //   bottom: 0,
      //   left: 'center',
      //   z: 100
      // },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.data.lastArr,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: this.data.dataList
    };
    return option;
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