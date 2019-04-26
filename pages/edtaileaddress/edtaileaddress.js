
Page({
  data: {
    region: [],
    currentIndex:'',
    shippingAddress:{}
  },
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  fromsubmit(e){
    //拼接地址详情对象
    let shippingAddress = {}
    shippingAddress.nickname = e.detail.value.nickname
    shippingAddress.telephon = e.detail.value.telephon
    shippingAddress.detaileaddress = e.detail.value.detaileaddress
    shippingAddress.region = this.data.region.join(" ")
    let currentIndex = this.data.currentIndex
    //修改缓存
    try {
      var addressList = wx.getStorageSync('addressList')
      console.log(addressList)
      if (addressList) {
        var obj = addressList[currentIndex]
        shippingAddress.isdefault = obj.isdefault

        addressList[currentIndex] = shippingAddress
        wx.setStorageSync("addressList", addressList)
      }
    } catch (e) {
      console.log("编辑失败")
    }
    wx:wx.navigateTo({
      url: '/pages/address/address',
      success: function(res) {
        // console.log(res)
      }
    })
  },
  onShow(e){
    this.edtaileaddressInit()
  },
  onLoad(e){
    this.data.currentIndex =e.index
    // console.log(this.data.currentIndex)
  },
  edtaileaddressInit(){
    //初始化数据
    let that = this
    let index = that.data.currentIndex
    let region = that.data.region
    // console.log(index)
    try {
      let data = wx.getStorageSync('addressList')
      let obj = data[index]
      region = obj.region.split(" ")
      that.setData({
        shippingAddress: obj,
        region: region
      })
    } catch (e) {
      console.log(编辑失败)
    }

  }
  
  

})