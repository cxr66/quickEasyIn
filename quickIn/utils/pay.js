var app = getApp();
 
function pay(openId, money){
  var money=0;
  //第一次请求  获取调用支付请求接口
  wx.request({
    url: '', // 后端接口
    data: {
      body: '', // 后台对接微信API定义的主体名
      openid: openId, // 支付人的OPENID
      total_fee: money // 支付金额
    },
    success: function (res) { //获取二次签名参数
      wx.requestPayment({ //调用支付接口 微信封装的接口
        appId: res.data.appId,
        timeStamp: res.data.timeStamp,
        nonceStr: res.data.nonceStr,
        package: res.data.package,
        signType: res.data.signType,
        paySign: res.data.paySign,
        //180.163.21.166:443
        'success': function (e) { //支付成功后的操作 
          
        },
        'fail': function (e) {
          return; //支付成功后的操作 
        },
      })
    }
  })
}

module.exports = {
  wxpay: pay
}