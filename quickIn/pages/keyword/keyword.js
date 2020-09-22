// pages/keyword/keyword.js
var app = getApp();
var that = undefined; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      name: "全部酒店"
    }, {
      name: "快捷连锁"
    }, {
      name: "今日特价"
    }],
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: '',
    // 酒店展示
    rec_list: [],
    searchValue: '',

    /* keyword展示   */
    keyWordList:[
      {
        title: '热搜排行',
        iconSrc: '/img/keyword/icon-hot.png',
        list:[
          {
            id: 0,
            desc:'浦东机场'
          },
          {
            id: 1,
            desc:'南京东路'
          },
          {
            id: 7,
            desc:'陆家嘴'
          },
          {
            id: 9,
            desc:'中山公园'
          },
          {
            id: 20,
            desc:'虹桥火车站'
          }
        ]
      },
      {
        title: '品牌排行',
        iconSrc: '/img/keyword/icon-brand.png',
        list:[
          {
            id: 2,
            desc:'全季'
          },
          {
            id: 3,
            desc:'汉庭'
          },{
            id: 4,
            desc:'成家公寓'
          },{
            id: 5,
            desc:'桔子'
          }
        ]
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    wx.getSystemInfo({ // 获取当前设备的宽高，文档有
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
    if (options.catId) {
      that.getInfoByCatId(1, 100, options.catId)
    }
  },

  /* 搜索酒店 */
  search(start, size, name) {

  },
  // 输入
  blur_set(e) {
    if (e.currentTarget.dataset.blur === '0') {
      that.setData({
        searchValue: e.detail.value
      })
      that.search(1, 100, that.data.searchValue);
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /* 点击选中 */
  clickSelect(e){
      wx.setStorageSync('keyWord', e.target.dataset.keyword);
      wx.navigateBack({
        delta: 1 // 返回上一页
      })
  },
  /* 点击切换样式 */
  clickChangeBlock(e) {
    that.setData({
      goodsBlockFirst: !that.data.goodsBlockFirst
    })
    console.log(that.data.goodsBlockFirst);
  },
  /* 点击切换 */
  clickMenu: function (e) {
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
  changeContent: function (e) {
    var current = e.detail.current // 获取当前内容所在index,文档有
    var tabWidth = this.data.windowWidth / 5
    this.setData({
      currentTab: current,
      tabScroll: (current - 2) * tabWidth
    })
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

  },

  /* 跳转 */
  navigate: function (e) {
    let link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
})