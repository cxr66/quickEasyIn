// pages/my/order/order.js
var app = getApp();
var that = undefined; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /**
     * 订单状态
    */

    menuList: [{
        name: "全部"
      },
      {
        name: "待付款"
      },
      {
        name: "待评价"
      },
    ],
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: '',
    // 酒店展示
    rec_list: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    wx.getSystemInfo({ // 获取当前设备的宽高，文档有
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },

  /* 
    确认
   */
  confirm(e) {

  
  },
  /* 
    退款
   */
  refund(e) {
    
  },
  /* 
    取消订单
  */
  cancle(e) {
    let params = {
      "orderCode": e.currentTarget.dataset.code
    };
    wx.showModal({
      title: '提示',
      content: '确定取消订单？',
      success: function(res) {
       
     
      },
      fail: function(res) {},
      complete: function(res) {},
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  clickMenu: function(e) {
    var current = e.currentTarget.dataset.current //获取当前tab的index
    var tabWidth = this.data.windowWidth / 4
    this.setData({
      tabScroll: (current - 2) * tabWidth //使点击的tab始终在居中位置
    })
    if (this.data.currentTab == current) {
      return false
    } else {
      this.setData({
        currentTab: current
      })
      
     
      /* wx.showLoading({
        title: '',
      }) */
      // 订单查询
      /* http.getDataReq(app.globalData.url_header + '', params, function(res) {
        console.log('订单查询', res.resObject);
        
        wx.hideLoading();
      }); */

    }
  },
  changeContent: function(e) {
    var current = e.detail.current // 获取当前内容所在index,文档有
    var tabWidth = this.data.windowWidth / 5

    this.setData({
      currentTab: current,
      tabScroll: (current - 2) * tabWidth
    })
    let params;
    if ((current - 1) < 0) {
  
    } else {
      
    }
   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})