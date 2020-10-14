// pages/order/order.js
var that = undefined;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabCurrentIndex: 0,
    navList: [{
      state: 0,
      text: '全部',
      loadingType: 'more',
      orderList: []
    },

    {
      state: 1,
      text: '待入住',
      loadingType: 'more',
      orderList: []
    }, 

    {
      state: 2,
      text: '商品订单',
      loadingType: 'more',
      orderList: []
    }],
    orderList : [{
      id:0,
      time: '2020-10-06 11:37',
      state: 1,
      image: 'https://bkimg.cdn.bcebos.com/pic/b8014a90f603738d027574c0bd1bb051f819ec11?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
          title:'华住酒店',
          price: 319, 
          number: 1,
          attr: '舒适大床房'
    },  
    
    ]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    /** * 修复app端点击除全部订单外的按钮进入时不加载数据的问题
        * 替换onLoad下代码即可
       */
    this.data.tabCurrentIndex = +options.state;

    this.setData({
      tabCurrentIndex: this.data.tabCurrentIndex
    })
  
    if (options.state == 0) {
      this.loadData();
    }
  },
  //获取订单列表
  loadData (source) {
    var _this = this;
    //这里是将订单挂载到tab列表下
    var index = this.data.tabCurrentIndex;
    var navItem = this.data.navList[index]; 
    var state = navItem.state;

    if (source === 'tabChange' && navItem.loaded === true) {
      //tab切换只有第一次需要加载数据
      return;
    }
    if (navItem.loadingType === 'loading') {
      //防止重复加载
      return;
    }

    navItem.loadingType = 'loading';

    setTimeout(function () {
      console.log('orderList',that.data.orderList);
      var orderList = _this.data.orderList.filter(function (item) {
        //添加不同状态下订单的表现形式
        item = Object.assign(item, _this.orderStateExp(item.state));
        //演示数据所以自己进行状态筛选
        if (state === 0) {
          //0为全部订单
          return item;
        }
        return item.state === state;
      });
      orderList.forEach(function (item) {
        navItem.orderList.push(item);
      });
      //loaded新字段用于表示数据加载完毕，如果为空可以显示空白页
      // _this.data.$set(navItem, 'loaded', true);
      
      //判断是否还有数据， 有改为 more， 没有改为noMore 
      navItem.loadingType = 'more';
      _this.setData({ navList: that.data.navList })

    }, 600);
  },

  //swiper 切换
  changeTab (e) {
    // this.data.tabCurrentIndex = e.target.current;
    this.setData({
      tabCurrentIndex : e.target.current
    })
    this.loadData();
    
  },
  //顶部tab点击
  tabClick (e) {
    // this.data.tabCurrentIndex = index;
    this.setData({
      tabCurrentIndex : e.target.dataset.index
    })
  },
  //删除订单
  deleteOrder(index) {
    var _this2 = this;
    wx.showLoading({
      title: '请稍后'
    });

    setTimeout(function () {
      that.data.navList[_this2.data.tabCurrentIndex].orderList.splice(index, 1);
      this.setData({
        navList : that.data.navList
      })
      wx.hideLoading();
    }, 600);
  },
  //取消订单
  cancelOrder(item) {
    var _this3 = this;
    wx.showLoading({
      title: '请稍后'
    });

    setTimeout(function () {
      var _this3$orderStateExp =
        _this3.orderStateExp(9), stateTip = _this3$orderStateExp.stateTip, stateTipColor = _this3$orderStateExp.stateTipColor;
      item = Object.assign(item, {
        state: 9,
        stateTip: stateTip,
        stateTipColor: stateTipColor
      });


      //取消订单后删除待付款中该项
      var list = _this3.data.navList[1].orderList;
      var index = list.findIndex(function (val) { return val.id === item.id; });
      index !== -1 && list.splice(index, 1);

      wx.hideLoading();
    }, 600);
  },

  //订单状态文字和颜色
  orderStateExp (state) {
    var stateTip = '',
      stateTipColor = '#6b427e';
    switch (+state) {
      case 1:
        stateTip = '待付款'; break;
      case 2:
        stateTip = '待发货'; break;
      case 9:
        stateTip = '订单已关闭';
        stateTipColor = '#909399';
        break;

      //更多自定义
    }
    return { stateTip: stateTip, stateTipColor: stateTipColor };
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

  },
  /* 跳转 */
  navigate: function(e) {
    let link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
})