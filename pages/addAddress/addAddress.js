var app = getApp()
Page({
  data: {
    region: ['广东省', '广州市', '海珠区'],
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  fromsubmit(e) {
    var that = this
    //拼接地址对象
    var useraddress = e.detail.value
    var region = this.data.region.join(" " )
    useraddress.region = region
    useraddress.isdefault = false
    //把地址对象添加到缓存里
    app.setAddress(useraddress);
    wx.navigateTo({
      url: `/pages/address/address`,
      success: function (res) {
        // console.log(res)
      }
    })
  },
})