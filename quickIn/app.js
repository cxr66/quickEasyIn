//app.js
App({
  onLaunch: function () {
    wx.removeStorageSync('keyWord');

    wx.cloud.init();
        const promise = new Promise((resolve, reject) => {
            wx.cloud.callFunction({
                name: 'login',
                success: (res) => {
                    console.log(res); 
                    if(res.result.userInfo){
                        const { openId } = res.result.userInfo; 
                        resolve(openId);
                    }else{
                        const { openid } = res.result; 
                        resolve(openid);
                    }
                    
                    
                },
                fail: () => {
                    wx.showToast({
                        title: '登录失败, 请重新登录',
                    });
                },
            })
        });
  },
  globalData: {
    userInfo: null
  }
})