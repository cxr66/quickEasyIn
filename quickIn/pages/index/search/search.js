// pages/index/search/search.js
var app = getApp();
var that = undefined; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuList: [{
      name: "积分换免房"
    }, {
      name: "收藏"
    }, {
      name: "曾住"
    }, {
      name: "全季"
    }, {
      name: "海友"
    }, {
      name: "桔子"
    }],
    tabScroll: 0,
    currentTab: 0,
    windowHeight: '',
    windowWidth: '',

    searchValue: '',
    /* 筛选 */
    filterList: [{
      name: '09/25 1晚',
      src: '/img/icon-bottom-empty.png',
      flag: 0
    },
    {
      name: '距离排序',
      src: '/img/icon-bottom-empty.png',
      flag: 1
    },
    {
      name: '筛选',
      src: '/img/icon-bottom-empty.png',
      flag: 2
    }],
    /* 酒店列表 */
    hotelList: [
      {
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
          locationCity:wx.getStorageSync('city')
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
  onReady: function() {

  },
  /* 点击切换样式 */
  clickChangeBlock(e) {
    that.setData({
      goodsBlockFirst: !that.data.goodsBlockFirst
    })
    console.log(that.data.goodsBlockFirst);
  },
  /* 点击切换 */
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
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
      this.setData({
        searchValue: wx.getStorageSync('keyWord')?wx.getStorageSync('keyWord'):''
      })
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