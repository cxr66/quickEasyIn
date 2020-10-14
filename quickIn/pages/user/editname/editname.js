// pages/user/editname/editname.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: ''
  },

  bindinput(e){
    this.setData({
      userName: e.detail.value
    })
  }, 
  /* 修改接口调用 */
  updateName(){
    if(this.data.userName){
      // this.data.userName
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        })
      }, 200);
    }else{
      wx.showToast({
        title: '未输入姓名',
        icon: 'none'
      })
    }
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