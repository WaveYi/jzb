// pages/profitDetail/index.js
import * as echarts from '../../components/ec-canvas/echarts';
import {
  agent_coupon_profit_info,
  seller_coupon_profit_info,
  seller_coupon_discount_info,
  coupon_profit_trend_chart,
  coupon_discount_trend_chart,
  coupon_profit_trend_chart_month,
  coupon_discount_trend_chart_month,
  coupon_agent_profit_trend_chart,  //代理人趋势图
  coupon_seller_profit_trend_chart, //销售员收益趋势图
  coupon_seller_discount_trend_chart//销售员折让趋势图
} from '../../api/user.js'

var Chart = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab_list: ["收益详情","折让详情"],
    activeIndex: 0,
    today: '',
    id: '',
    bossId: '',
    type: '',
    date: '',
    page: 1,
    list: [],

    title: '促销劵收益趋势图',
    selectDayMonth: true,
    lastArr: [],
    lastMonth: [],
    dataList: [],
    ec: {
      lazyLoad: true // 延迟加载
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var today = Y + '-' + M + '-' + D;

    let last7 = [];
    for(let i=0;i<=9;i++){
      this.getLastSevenDay(i);
      // 获取最近7天的日期  this.getLastSevenDay(i).M_before+'月'+
      last7.unshift(this.getLastSevenDay(i).D_before);
    }

    if(options.index){
      this.setData({
        activeIndex: options.index
      })
    }
    console.log(this.data.activeIndex)

    if(options.bossId){
      this.setData({
        bossId: options.bossId
      })
    }

    this.setData({
      type: options.type,
      id: options.id,
      date: options.date,
      today: today,
      lastArr: last7
    })
    console.log(this.data.type)

    this.echartsComponnet = this.selectComponent('#mychart');
    this.getData(); //获取数据

    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
        this.setData({
          title: '促销劵收益趋势图'
        })
      }else{
        this.getSellerDiscountDetail();
        this.setData({
          title: '促销劵折让趋势图'
        })
      }
    }
  },
  // 代理人详情
  getAgentDetail(){
    let data = {
      date: this.data.today,
      pageNum: this.data.page,
      pageSize: 20,
      memberId: this.data.id
    }
    if(this.data.type == 'agent'){
      data = {
        date: this.data.today,
        pageNum: this.data.page,
        pageSize: 20,
        bossId: this.data.bossId
      }
    }
    agent_coupon_profit_info(data).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            list: res.data.records
          })
        }else{
          this.setData({
            list: this.data.list.concat(res.data.records)
          })
        }
      }
    })
  },
  // 销售员收益详情
  getSellerProfitDetail(){
    let data = {
      date: this.data.today,
      pageNum: this.data.page,
      pageSize: 20,
      memberId: this.data.id
    }
    if(this.data.type == 'seller'){
      data = {
        date: this.data.today,
        pageNum: this.data.page,
        pageSize: 20
      }
    }
    seller_coupon_profit_info(data).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            list: res.data.records
          })
        }else{
          this.setData({
            list: this.data.list.concat(res.data.records)
          })
        }
      }
    })
  },
  // 销售员折让详情
  getSellerDiscountDetail(){
    let data = {
      date: this.data.today,
      pageNum: this.data.page,
      pageSize: 20,
      memberId: this.data.id
    }
    if(this.data.type == 'seller'){
      data = {
        date: this.data.today,
        pageNum: this.data.page,
        pageSize: 20
      }
    }
    seller_coupon_discount_info(data).then((res)=>{
      if(res.code == 200){
        if(this.data.page == 1){
          this.setData({
            list: res.data.records
          })
        }else{
          this.setData({
            list: this.data.list.concat(res.data.records)
          })
        }
      }
    })
  },  
  bindDateChange(e){
    this.setData({
      list: [],
      page: 1,
      today: e.detail.value
    })
    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
      }else{
        this.getSellerDiscountDetail();
      }
    }
  },
  clickNav(e){
    this.setData({
      lastMonth: [],
      dataList: [],
      list: [],
      page: 1,
      activeIndex: e.currentTarget.dataset.index
    })
    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
        this.getData();
        this.setData({
          title: '促销劵收益趋势图'
        })
      }else{
        this.getSellerDiscountDetail();
        this.getData();
        this.setData({
          title: '促销劵折让趋势图'
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  selectDayOrMonth(){
    this.data.selectDayMonth = !this.data.selectDayMonth;
    this.setData({
      lastMonth: [],
      dataList: [],
      selectDayMonth: this.data.selectDayMonth
    })
    
    let last7 = [];
    for(let i=0;i<=9;i++){
      this.getLastSevenDay(i);
      // 获取最近7天的日期  this.getLastSevenDay(i).M_before+'月'+
      last7.unshift(this.getLastSevenDay(i).D_before);
    }
    console.log(last7)
    if(this.data.selectDayMonth == true){
      this.data.lastArr = last7;
    }else{
      this.data.lastArr = this.data.lastMonth;
    }
    this.setData({
      lastArr: this.data.lastArr
    })
    this.getData();
  },
  getLastSevenDay(n){
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var tdate = new Date(timestamp * 1000);
    //获取年份
    var Y = tdate.getFullYear();
    //获取月份
    var M = (tdate.getMonth() + 1 < 10 ? '0' + (tdate.getMonth() + 1) : tdate.getMonth() + 1);
    //获取当日日期
    var D = tdate.getDate() < 10 ? '0' + tdate.getDate() : tdate.getDate();
    //減7天的时间戳：
    var before_timetamp = timestamp - 24 * 60 * 60 * n;
    //減7天的时间：
    var n_to = before_timetamp * 1000;
    var before_timetamp = new Date(n_to);
    var Y_before = before_timetamp.getFullYear();
    //月份
    var M_before = (before_timetamp.getMonth() + 1 < 10 ? '0' + (before_timetamp.getMonth() + 1) : before_timetamp.getMonth() + 1);
    //日期
    var D_before = before_timetamp.getDate() < 10 ? '0' + before_timetamp.getDate() : before_timetamp.getDate();
    var lastDay = {
      M_before,
      D_before
    }
    // console.log(M_before,D_before)
    return lastDay;
  },
  getData(){
    console.log(this.data.type)
    if(this.data.type == 'boss'){
      if(this.data.activeIndex == 0){
        if(this.data.selectDayMonth == true){
          coupon_profit_trend_chart().then((res)=>{
            if(res.code == 200){
              this.data.dataList.push({
                name: '',
                type: 'line',
                smooth: true,
                data: res.data
              })
              this.setData({
                dataList: this.data.dataList
              })
              this.init_echarts();
            }
          })
        }else{
          coupon_profit_trend_chart_month().then((res)=>{
            if(res.code == 200){
              this.data.dataList.push({
                name: '',
                type: 'line',
                smooth: true,
                data: res.data.data
              })
              let date = res.data.date;
              for(let j in date){
                this.data.lastMonth.push(date[j].split('-')[1]);
              }
              this.setData({
                dataList: this.data.dataList,
                lastMonth: this.data.lastMonth
              })
              this.init_echarts();
            }
          })
        }
      }else{
        if(this.data.selectDayMonth == true){
          coupon_discount_trend_chart().then((res)=>{
            if(res.code == 200){
              this.data.dataList.push({
                name: '',
                type: 'line',
                smooth: true,
                data: res.data
              })
              this.setData({
                dataList: this.data.dataList
              })
              this.init_echarts();
            }
          })
        }else{
          coupon_discount_trend_chart_month().then((res)=>{
            if(res.code == 200){
              this.data.dataList.push({
                name: '',
                type: 'line',
                smooth: true,
                data: res.data.data
              })
              let date = res.data.date;
              for(let j in date){
                this.data.lastMonth.push(date[j].split('-')[1]);
              }
              this.setData({
                dataList: this.data.dataList,
                lastMonth: this.data.lastMonth
              })
              this.init_echarts();
            }
          })
        }
      }
    }else if(this.data.type == 'agent'){
      coupon_agent_profit_trend_chart({
        bossId: this.data.bossId
      }).then((res)=>{
        if(res.code == 200){
          this.data.dataList.push({
            name: '',
            type: 'line',
            smooth: true,
            data: res.data
          })
          this.setData({
            dataList: this.data.dataList
          })
          this.init_echarts();
        }
      })
    }else{
      console.log(this.data.activeIndex);
      if(this.data.activeIndex == 0){
        coupon_seller_profit_trend_chart().then((res)=>{
          if(res.code == 200){
            this.data.dataList.push({
              name: '',
              type: 'line',
              smooth: true,
              data: res.data
            })
            this.setData({
              dataList: this.data.dataList
            })
            this.init_echarts();
          }
        })
      }else{
        coupon_seller_discount_trend_chart().then((res)=>{
          if(res.code == 200){
            this.data.dataList.push({
              name: '',
              type: 'line',
              smooth: true,
              data: res.data
            })
            this.setData({
              dataList: this.data.dataList
            })
            this.init_echarts();
          }
        })
      }
    }
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
        text: this.data.title,
        left: 'center'
      },
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
    this.data.page++;
    this.setData({
      page: this.data.page
    })
    
    if(this.data.type == 'boss'){
      this.getAgentDetail();
    }else if(this.data.type == 'agent'){
      this.getAgentDetail();
    }else{
      if(this.data.activeIndex == 0){
        this.getSellerProfitDetail();
      }else{
        this.getSellerDiscountDetail();
      }
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})