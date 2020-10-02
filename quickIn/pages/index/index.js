//index.js
//获取应用实例
const app = getApp()
var Moment = require("../../utils/moment.js");
var { getDaysBetween } = require("../../utils/util.js");
var DATE_LIST = [];
var DATE_YEAR = new Date().getFullYear()
var DATE_MONTH = new Date().getMonth() + 1
var DATE_DAY = new Date().getDate()
var that = undefined;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 轮播图 */
    weekStr: ['日', '一', '二', '三', '四', '五', '六'],
    indicatorDots: false,
    autoplay: true,
    duration: 3000,
    swiperList: [{
      bannerUrl: 'https://www.baidu.com',
      bannerPath: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3879389638,1920575028&fm=26&gp=0.jpg',
      name: ''
    }],

    /* 菜单：全日房或者时租房 */
    menuList: [{
      name: "全日房"
    }, {
      name: "时租房"
    }],
    tabScroll: 0,
    currentTab: 0,
    /* 表单提交数据 */
    form: {
      location: "上海",
      begin_time: '11-14',
      end_time: '11-14',
      keyWord: '酒店位置/名称/关键词',
    },
    checkInDate: "",
    checkOutDate: "",

    /* 日租房 */
    time: '12:00',
    /* 住过看过 */
    historyList: [{
      name: '住过',
      src: '/img/icon-bed.png',
      flag: 0
    },
    {
      name: '看过',
      src: '/img/icon-see.png',
      flag: 1
    }]
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  // 跳转
  navigate: function (e) {
    let link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  /* 判断日期是周几 */
  getToday(date) {
    var myDate = new Date(Date.parse(date));
    return this.data.weekStr[myDate.getDay()]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //设缓存缓存起来的日期
    wx.setStorage({
      key: 'ROOM_SOURCE_DATE',
      data: {
        checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
        checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD'),
        weekDay: this.getToday(Moment(new Date()).format('YYYY-MM-DD'))
      }
    });


    that.locate();
  },
  /* 微信定位 */
  locate: function () {
    var that = this;
    wx.showLoading({
      title: '正在获取您当前定位',
    })
    // ------------ 腾讯LBS地图  --------------------
    wx.getLocation({
      type: "gcj02",
      success: (res) => {
        //获取用户的初始位置
        wx.setStorageSync('locationLong', res.longitude);
        wx.setStorageSync('locatioLati', res.latitude);
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        });
        var locationString = res.latitude + "," + res.longitude;
        wx.request({
          url: 'https://apis.map.qq.com/ws/geocoder/v1/',
          data: {
            "key": "JMOBZ-5TKAV-AXHPC-UCDS4-T3Y5O-Y6BQV",
            "location": locationString
          },
          method: 'GET',
          success: function (r) {
            //输出一下位置信息 
            console.log('用户位置信息', r.data.result);
            //r.data.result.address获得的就是用户的位置信息，将它保存到一个全局变量上 

            that.setData({
              ['form.location']: r.data.result.address
            })
            wx.setStorageSync('city', r.data.result.address_component.city)
            wx.hideLoading();
          },
          fail: function (r) {
            wx.hideLoading();
            wx.showModal({
              title: '提示',
              content: '请确保您手机设置中-定位服务已打开'
            })
          }
        });
      }
    })
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
        currentTab: current,

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
      weekDay: getDate.weekDay,
      days: getDaysBetween(getDate.checkInDate, getDate.checkOutDate),
      ['form.keyWord']: wx.getStorageSync('keyWord')?wx.getStorageSync('keyWord'):'酒店位置/名称/关键词'
    })
  },
  clearKeyWord(){
    wx.removeStorageSync('keyWord');
    this.setData({ 
      ['form.keyWord']: '酒店位置/名称/关键词'
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
