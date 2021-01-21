// pages/shipment/index.js
import {
  queryCouponSellAmountStatisticalTrend
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
    queryCouponSellAmountStatisticalTrend({}).then((res)=>{
      if(res.code == 200){
        if(res.data[0] != null){
          let x_data = [[],[],[],[],[],[]];	
          for(let i in res.data){
            //新年券	
            x_data[0].push(res.data[i].newYearSellAmount)
            //春节券		
            x_data[1].push(res.data[i].springSellAmount)
            //元宵券		
            x_data[2].push(res.data[i].dumplingsSellAmount)
            //家庭券		
            x_data[3].push(res.data[i].familySellAmount)
            //敬老券		
            x_data[4].push(res.data[i].respectSellAmount)
            //情侣券		
            x_data[5].push(res.data[i].couplesSellAmount)
          }
          for(let i=0;i<6;i++){
            let txt = '';
            if(i==0){
              txt = '新年券';
            }else if(i==1){
              txt = '春节券';
            }else if(i==2){
              txt = '元宵券';
            }else if(i==3){
              txt = '家庭券';
            }else if(i==4){
              txt = '敬老券';
            }else{
              txt = '情侣券';
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
        text: '促销券类型销量报表',
        left: 'center'
      },
      grid: {
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      xAxis: [
          {
              type: 'category',
              data: this.data.lastMonth
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: this.data.dataList
      // color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
      // legend: {
      //   data: ['A', 'B', 'C','D', 'E', 'F','G', 'H', 'I'],
      //   bottom: 0,
      //   left: 'center',
      //   z: 100
      // },
      // series: this.data.dataList
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