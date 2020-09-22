// pages/hoteldetail/createorder/createorder.js
var that = undefined;
var { getDaysBetween } = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      name: '',
      mobile: '',
      remark: ''
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /* submit */
  submit() {
    // console.log('form', this.data.form);
    if (this.data.form.name && this.data.form.mobile) {
      if (this.data.form.mobile.length === 11) {
        wx.setStorageSync('orderDetail', this.data.form);
        wx.navigateTo({
          url: '/pages/pay/pay',
        })
      } else {
        wx.showToast({
          title: '请填写正确的手机号码',
          icon: 'none'
        })
      }
    } else {
      wx.showToast({
        title: '姓名和手机号必填',
        icon: 'none'
      })
    }
  },
  /* nput */
  bindinput(e) {
    // console.log(e.detail.value);
    let setM = 'form.' + e.target.dataset.flag;
    this.setData({
      [setM]: e.detail.value
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
    let getDate = wx.getStorageSync("ROOM_SOURCE_DATE");
    this.setData({
      checkInDate: getDate.checkInDate.split('-')[1] + '月' + getDate.checkInDate.split('-')[2] + '日',
      checkOutDate: getDate.checkOutDate.split('-')[1] + '月' + getDate.checkOutDate.split('-')[2] + '日',
      days: getDaysBetween(getDate.checkInDate, getDate.checkOutDate)
    })
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