import {
  qrCodeFileList,
  editQrCodeFileList
} from '../../api/qrCode.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl: "",
    name: "",
    number: "",
    codeId: "",
    form: [],
    editForm: [],
    value: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      ...options,
      imageUrl: ""
    })
    this.firstList()
  },
  firstList() {
    qrCodeFileList({
      quickResponseCodeId: this.data.codeId,
      quickResponseCodeNumber: this.data.number
    }).then(res => {
      if (res.data.length > 0) {
        this.setData({
          form: res.data,
          imageUrl: res.data[0].weseeImageLink,
          editForm: res.data
        });
      }
    })
  },
  onChange(e) {
    let index = e.currentTarget.dataset.index
    let newData = this.data.editForm;
    newData[index].weseeLink = e.detail;
    this.setData({
      editForm: newData
    })
  },
  save() {
    wx.showLoading({
      title: '提交中',
    })
    let newData = this.data.editForm;
    newData.forEach((item, index) => {
      item.name = "视频" + (index + 1)
    })
    editQrCodeFileList(newData).then(res => {
      if (res.code == 200) {
        wx.hideLoading()
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 2000
        })
        this.setData({
          value: ''
        })
        this.firstList()
      }
    })
  },
  //播放视频
  play(e) {
    let row = e.currentTarget.dataset.row;
    wx.navigateTo({
      url: '/pages/toChangeVideo/index?url=' + wx.encodeUnicode(row.weseeLink)
    })
  }
})