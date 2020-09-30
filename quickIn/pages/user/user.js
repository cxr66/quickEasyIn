// pages/user/user.js
let startY = 0, moveY = 0, pageAtTop = true;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coverTransform: 'translateY(-10px)',
    coverTransition: '0s',
    moving: false,
    // 设置
    setList: [ 
      {
        desc: '会员计划',
        link: '/pages/user/plan/plan',
      },
      {
        desc: '第三方账号',
        link: '/pages/user/bind/bind',
      },
      /* {
        desc: '地址管理',
        link: '/pages/address/address',
      }, */
    ],
  },
  // 
  /** * 统一跳转接口,拦截未登录路由
              * navigator标签现在默认没有转场动画，所以用view
   */ 
  /**
      *  会员卡下拉和回弹
      *  1.关闭bounce避免ios端下拉冲突
      *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
      *    transition设置0.1秒延迟，让css来过渡这段空窗期
      *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
      */
  coverTouchstart: function coverTouchstart(e) {
    if (pageAtTop === false) {
      return;
    }
    this.data.coverTransition = 'transform .1s linear';
    startY = e.touches[0].clientY;
  },
  coverTouchmove: function coverTouchmove(e) {
    moveY = e.touches[0].clientY;
    var moveDistance = moveY - startY;
    if (moveDistance < 0) {
      this.data.moving = false;
      return;
    }
    this.data.moving = true;
    if (moveDistance >= 80 && moveDistance < 100) {
      moveDistance = 80;
    }

    if (moveDistance > 0 && moveDistance <= 80) {
      this.setData({
        coverTransform : "translateY(".concat(moveDistance, "px)")
      });
    }
  },
  coverTouchend: function coverTouchend() {
    if (this.data.moving === false) {
      return;
    }
    this.data.moving = false; 

    this.setData({
      coverTransition : 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)',
      coverTransform : 'translateY(0px)'
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  // 跳转
  navigate: function (e) {
    let link = e.currentTarget.dataset.link;
    wx.navigateTo({
      url: link
    })
  },
})

