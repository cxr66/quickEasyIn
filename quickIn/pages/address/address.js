
Page({
  data: function data() {
    return {
      source: 0,
      addressList: [
        {
          name: '刘晓晓',
          mobile: '18666666666',
          addressName: '贵族皇仕牛排(东城店)',
          address: '北京市东城区',
          area: 'B区',
          default: true
        },
        {
          name: '刘大大',
          mobile: '18667766666',
          addressName: '龙回1区12号楼',
          address: '山东省济南市历城区',
          area: '西单元302',
          default: false
        }]
    };



  },
  onLoad: function onLoad(option) {
    console.log(option.source);
    this.source = option.source;
  },
  // methods
  //选择地址
  checkAddress: function checkAddress(item) {
    if (this.source == 1) {
      //this.$api.prePage()获取上一页实例，在App.vue定义
      this.$api.prePage().addressData = item;
      wx.navigateBack();
    }
  },
  addAddress(type, item) {
    wx.navigateTo({
      url: "/pages/address/addressManage?type=".concat(type, "&data=").concat(JSON.stringify(item))
    });

  },
  //添加或修改成功之后回调
  refreshList: function refreshList(data, type) {
    //添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
    this.addressList.unshift(data);

    console.log(data, type);
  }
})