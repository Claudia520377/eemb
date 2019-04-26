Page({
  data: {
    addressList:[]

  },

  // 更改默认地址
  changeaddress(e){
    let that = this
    let currentIndex = e.currentTarget.dataset.index
    try{
      let data = wx.getStorageSync('addressList')
      
      let previous =" "
      for (let i = 0; i < data.length; i++) {
          let obj = data[i]
          if (obj.isdefault ){
            previous = i;
          }
          obj.isdefault = false 
        }
      if (currentIndex !== previous) {
        data[currentIndex].isdefault = !data[currentIndex].isdefault;
      }
      wx.setStorageSync('addressList', data)
      that.init()

    }catch(e){
      console.log(获取缓存失败)
    }
  },
  //删除地址
  deleteaddress(e){
    var that = this
    let index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;
    //删除对应的缓存数据
    try {
      let data = wx.getStorageSync('addressList')
      if (data) {
        data.splice(index,1)
        wx.setStorageSync('addressList', data)
        that.init()
      }
    } catch (e) {
      console.log("删除地址失败")
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    this.init()
  },
  onShow: function(option){
    this.init()

  },
  init:function(){
    var that = this
    
    try {
      let data = wx.getStorageSync('addressList') || []
      if (data) {
        that.setData({
          addressList: data
        })
        // console.log(data)
      }
    } catch (e) {
      console.log(获取缓存失败)
    }
  }
})  