// pages/hoteldetail/hoteldetail.js
var that = undefined;
var { getDaysBetween, navigate } = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 如果需要轮播。则使用该数据 */
    /* imgList: [{
      bannerUrl: 'https://www.baidu.com',
      src: '/img/banner1.jpg',
      name: ''
    },
    {
      bannerUrl: 'https://www.baidu.com',
      src: '/img/banner1.jpg',
      name: ''
    }], */

    //  房型展示
    roomTypeList: [
      {
        src: 'https://dimg13.c-ctrip.com/images/0206y120004z1lvk26BCF_R_300_225.jpg',
        desc: '25平方 无窗 大床',
        bedDesc: '1.8m/2.0m',
        room_type: '舒适大床房',
        room_price: 218,
        room_price_offline: '259'
      }, {
        src: 'https://dimg13.c-ctrip.com/images/0206y120004z1lvk26BCF_R_300_225.jpg',
        desc: '25平方 有窗 大床',
        bedDesc: '1.8m/2.0m',
        room_type: '舒适大床房(带窗)',
        room_price: 318,
        room_price_offline: '349'
      },
      {
        src: 'https://dimg13.c-ctrip.com/images/02029120004z18wci902D_R_300_225.jpg',
        desc: '32平方 有窗 双人床',
        bedDesc: '1.8m/2.0m',
        room_type: '标准双人房',
        room_price: 278,
        room_price_offline: '318'
      },
    ],

    /* 顶部列表 */
    hSwiperList: ['https://dimg11.c-ctrip.com/images/200q0u000000jid3wC276_R_200_200.jpg', 'https://bkimg.cdn.bcebos.com/pic/21a4462309f7905254a1159806f3d7ca7acbd5de?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg','https://dimg11.c-ctrip.com/images/200q0u000000jid3wC276_R_200_200.jpg'],

    /* 附近酒店 */
    nearbyList: [{
      image: 'https://dimg11.c-ctrip.com/images/200q0u000000jid3wC276_R_200_200.jpg',
      title: '上海佘山大酒店',
      price: 289,
      distance: 10,
      point: 4.9
    },{
      image: 'https://bkimg.cdn.bcebos.com/pic/21a4462309f7905254a1159806f3d7ca7acbd5de?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
      title: '上海虹桥桔子水晶酒店',
      price: 319,
      distance: 8.9,
      point: 4.6
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    that.setData({
      hotelId: options.id,
      // hotelDetail 是请求拿到当前酒店数据，接口调用后赋值
      hotelDetail: {
        point: 4,
        name: '上海全季酒店',
        commentNum: 5,
        isMem: 1,// 会员等级
        
      }
    })
    /*   //设缓存缓存起来的日期
      wx.setStorage({
        key: 'ROOM_SOURCE_DATE',
        data: {
          checkInDate: Moment(new Date()).format('YYYY-MM-DD'),
          checkOutDate: Moment(new Date()).add(1, 'day').format('YYYY-MM-DD')
        }
      }); */
      
  },
/* 选择地点 */
  guideLocation(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success (res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.openLocation({
          latitude,
          longitude,
          scale: 18
        })
      }
     })
  },
  /* 跳转 */
  navigate: function (e) {
    let link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
  /* 预览图片 */
  preview(e) {
    wx.previewImage({
      current: e.target.dataset.current, // 当前显示图片的http链接
      urls: that.data.hSwiperList // 需要预览的图片http链接列表
    })
  },
  //规格弹窗开关
  toggleSpec: function toggleSpec() {
    var _this2 = this;
    if (this.specClass === 'show') {
      this.specClass = 'hide';
      setTimeout(function () {
        _this2.specClass = 'none';
      }, 250);
    } else if (this.specClass === 'none') {
      this.specClass = 'show';
    }
  },
  //选择规格
  selectSpec: function selectSpec(index, pid) {
    var _this3 = this;
    var list = this.specChildList;
    list.forEach(function (item) {
      if (item.pid === pid) {
        _this3.$set(item, 'selected', false);
      }
    });

    this.$set(list[index], 'selected', true);
    //存储已选择
    /**
     * 修复选择规格存储错误
     * 将这几行代码替换即可
     * 选择的规格存放在specSelected中
     */
    this.specSelected = [];
    list.forEach(function (item) {
      if (item.selected === true) {
        _this3.specSelected.push(item);
      }
    });

  },
  //分享
  share: function share() {
    this.$refs.share.toggleMask();
  },
  //收藏
  toFavorite: function toFavorite() {
    this.favorite = !this.favorite;
  },
  buy: function buy() {
    uni.navigateTo({
      url: "/pages/order/createOrder"
    });

  },
  stopPrevent: function stopPrevent() { },
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
      days: getDaysBetween(getDate.checkInDate, getDate.checkOutDate)
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