// pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payType: 1,
    orderInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //选择支付方式
  changePayType: function changePayType(type) {
    this.data.payType = type;
  },
  //确认支付
  confirm: function () {
    wx.showToast({
      title: '支付成功，正在跳转',
      duration:2000,
      success(){
        wx.navigateTo({
          url: '/pages/order/orderDetail/orderDetail',
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