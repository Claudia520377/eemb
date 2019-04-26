
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
    //拼接地址对象
    var useraddress = e.detail.value
    var region = this.data.region.join(" " )
    useraddress.region = region
    useraddress.isdefault = false
    //获取缓存地址
    try {
      var addressList = wx.getStorageSync('addressList') || []
      if (addressList) {
        addressList.push(useraddress)
        wx.setStorageSync('addressList', addressList)
      }
    } catch (e) {
      console.log('添加报错')
    }


    wx.navigateTo({
      url: `/pages/address/address`,
      success: function (res) {
        // console.log(res)
      }
    })
  }
})