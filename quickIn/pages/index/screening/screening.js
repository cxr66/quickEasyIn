// pages/index/screening/screening.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sizeCalcState: false,
      tabScrollTop: 0,
      currentId: 0,

      flist: [{
        name: '品牌',
        id: 0
      },{
        name: '地铁',
        id: 1
      },{
        name: '价格',
        id: 2
      },{
        name: '商圈',
        id: 3
      },{
        name: '区域',
        id: 4
      },{
        name: '设施',
        id: 5
      },{
        name: '权益',
        id: 6
      }],
      
      slist: [{
        id: 1,
        image: 'https://bkimg.cdn.bcebos.com/pic/21a4462309f7905254a1159806f3d7ca7acbd5de?x-bce-process=image/resize,m_lfit,w_268,limit_1/format,f_jpg',
        attr_val: '桔子酒店',
        stock: 15,
        title: '桔子酒店上海虹桥分店',
        price: 278.00, 
      }],
      tlist: [],
     
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      currentTitle: this.data.flist[this.data.currentId].name,
    })
    /* 若需要过滤，可在此处js填写 李哥如果需要用filter自己写一下*/
    /* this.data.cartList.forEach(item=>{
      
    })  */ 
  },
  //一级分类点击
  tabtap: function tabtap(e) {
    // 计算数项滑动高度
    
    /* if (!this.data.sizeCalcState) {
      this.calcSize();
    } */
 
    // var index = this.data.slist.findIndex(function (sitem) {return sitem.pid === item.id;});
    // this.data.tabScrollTop = this.data.slist[index].top;
    this.setData({
      // slist: this.data.slist,
      currentId: e.currentTarget.dataset.fid,
      currentTitle: e.currentTarget.dataset.name,
    })
    console.log(this.data.currentTitle)
  },
  //右侧栏滚动
  asideScroll: function asideScroll(e) {
    /* if (!this.data.sizeCalcState) {
      this.data.calcSize();
    } */
    var scrollTop = e.detail.scrollTop;
    var tabs = this.data.slist.filter(function (item) {return item.top <= scrollTop;}).reverse();
    if (tabs.length > 0) {
      this.currentId = tabs[0].pid;
      this.setData({
        currentId : tabs[0].pid
      })
    }
  },
  //计算右侧栏每个tab的高度等信息
  calcSize: function calcSize() {
    var h = 0;
    this.data.slist.forEach(function (item) {
      var view = wx.createSelectorQuery().select("#main-" + item.id);
      view.fields({
        size: true },
      function (data) {
        item.top = h;
        h += data.height;
        item.bottom = h;
      }).exec();
    });
    this.setData({
      sizeCalcState : true
    });
  },
  navToList: function navToList(e) {
    let sid = e.currentTarget.dataset.sid,tid = e.currentTarget.dataset.tid;
    wx.navigateTo({
      url: "/pages/product/list?fid=".concat(this.data.currentId, "&sid=").concat(sid, "&tid=").concat(tid) 
    });
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