// pages/telephon:1275638500,address/telephon:1275638500,address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList:[
      {name:"cheng cheng",telephone:1275638500,address:"湖北省 武汉市 丁字桥",isdefault:true},
      {name:"hui hui",telephone:1275638500,address:"湖北省 武汉市 无极萨珊",isdefault:false},
      {name:"fang fang ",telephone:1275638500,address:"湖北省 武汉市 金融港",isdefault:false}
    ]

  },

  // 更改默认地址
  changeaddress(e){
    // var that = this
    var index = e.currentTarget.dataset.index
    var addressList = this.data.addressList
    
    for(let i = 0;i<addressList.length;i++){
      let address = addressList[i]
      address.isdefault = false;
    }
    addressList[index].isdefault=!addressList[index].isdefault
    this.setData({
      addressList:addressList

    })
    // console.log(isdefault)
  },
  //删除地址
  deleteaddress(e){
    let index = e.currentTarget.dataset.index;
    let addressList = this.data.addressList;
    addressList.splice(index,1);
    this.setData({
      addressList:addressList
    })

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

  }
})