//app.js
App({
  onLaunch: function () {
    wx.removeStorageSync('keyWord');
  },
  globalData: {
    userInfo: null
  }
})