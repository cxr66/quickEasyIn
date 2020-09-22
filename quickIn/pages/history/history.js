// pages/history/history.js
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
        name: "住过"
      },
      {
        name: "看过"
      }
    ],
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: '',
    // 酒店展示
    rec_list: [],
    /* 酒店列表 */
    hotelList: [
      {
        id:1,
        hotelImg: 'https://bkimg.cdn.bcebos.com/pic/21a4462309f7905254a1159806f3d7ca7acbd5de?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
        name: '桔子水晶酒店（上海虹桥机场店）',
        point: 8.4,
        commentWord: '性价比高 服务好',
        commentNum: 9,
        keyword: '经济型/四星级',
        addKeyWord: '虹桥枢纽',
        price: 209,
        distance: 3
      },
      {
        id:1,
        hotelImg: '/img/swiper-index.png',
        name: '维也纳酒店（上海虹桥机场九亭店）',
        point: 7.8,
        commentWord: '地理位置优越',
        commentNum: 9,
        keyword: '经济型/四星级',
        addKeyWord: '虹桥枢纽',
        price: 218,
        distance: 3
      },
      {
        id:1,
        hotelImg: 'https://dimg11.c-ctrip.com/images/200q0u000000jid3wC276_R_200_200.jpg',
        name: '如家酒店(上海新国际博览中心店)',
        point: 8.4,
        commentWord: '性价比高  服务态度好',
        commentNum: 9,
        keyword: '经济型/五星级',
        addKeyWord: '上海世博园',
        price: 318,
        distance: 3
      }
    ]
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
          windowWidth: res.windowWidth,
          currentTab: options.historyFlag
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