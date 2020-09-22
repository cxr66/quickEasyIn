// pages/order/orderDetail/orderDetail.js

const app = getApp()
var Moment = require("../../../utils/moment.js");
var { getDaysBetween } = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
      days: getDaysBetween(getDate.checkInDate, getDate.checkOutDate),
      ['form.keyWord']: wx.getStorageSync('keyWord')?wx.getStorageSync('keyWord'):'酒店位置/名称/关键词'
    })
  },

  /* shouye */
  switchTab(e){
    wx.switchTab({
      url: e.target.dataset.tab,
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