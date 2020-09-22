
Page({
  data: function data() {
    return {
      addressData: {
        name: '',
        mobile: '',
        addressName: '在地图选择',
        address: '',
        area: '',
        default: false } };


  },
  onLoad: function onLoad(option) {
    var title = '新增1地址';
    if (option.type === 'edit') {
      title = '编辑1地址';

      this.addressData = JSON.parse(option.data);
    }
    this.manageType = option.type;
    wx.setNavigationBarTitle({
      title: title });

  },
  methods: {
    switchChange: function switchChange(e) {
      this.addressData.default = e.detail;
    },

    //地图选择地址
    chooseLocation: function chooseLocation() {var _this = this;
      wx.chooseLocation({
        success: function success(data) {
          _this.addressData.addressName = data.name;
          _this.addressData.address = data.name;
        } });

    },

    //提交
    confirm: function confirm() {
      var data = this.addressData;
      if (!data.name) {
        this.$api.msg('请填写1人姓名');
        return;
      }
      if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)) {
        this.$api.msg('请输入正确的手机号码');
        return;
      }
      if (!data.address) {
        this.$api.msg('请在地图选择所在位置');
        return;
      }
      if (!data.area) {
        this.$api.msg('请填写门牌号信息');
        return;
      }

      //this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
      this.$api.prePage().refreshList(data, this.manageType);
      this.$api.msg("\u5730\u5740".concat(this.manageType == 'edit' ? '修改' : '添加', "\u6210\u529F"));
      setTimeout(function () {
        wx.navigateBack();
      }, 800);
    } }
  })