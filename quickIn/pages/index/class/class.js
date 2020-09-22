// pages/mall/class/class.js
var app = getApp(); 
var that = undefined;
Page({
  data: {
    tabIndex: 0,
    // 统计酒店数量和价格
    orderCount: {
      num: 0,
      money: 0
    },
    bottomFlag: false,
    // 提交的订单
    orders: true,
    menus: [{
        catName: '快捷连锁'
      },
      {
        catName: '四星/高档'
      }, {
        catName: '五星/豪华'
      }
    ],
    // 酒店列表
    items: [{
        name: '格林豪泰',
        id: 0
      },
      {
        name: '如家',
        id: 1
      },
      {
        name: '汉庭',
        id: 2
      },
      {
        name: '锦江之星',
        id: 3
      },

    ],
    catId: 0
    /* 下方定位选规格 */
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    /* 商城设置数据 */

  },

  // 下拉刷新
  onPullDownRefresh: function() {
    setTimeout(() => {
      wx.showToast({
        title: '成功加载数据',
        icon: 'success',
        duration: 500
      });
      wx.stopPullDownRefresh()
    }, 500);
  },
  tabMenu: function(e) {
    let index = e.target.dataset.index,
      catId = e.target.dataset.id;
    if (index != that.data.tabIndex) {
      // that.getInfoByCatId(1,100,catId);
    }
    this.setData({
      tabIndex: index
    });
  },
  itemClick(e) {
    let catId = e.target.dataset.id;
    if (catId != that.data.catId) {
      this.setData({
        catId: catId
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  },
  /* 跳转 */
  navigate: function(e) {
    let link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },

})