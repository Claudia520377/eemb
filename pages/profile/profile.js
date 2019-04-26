// pages/profiles/profiles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    shopcarcount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options){
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo,
      //num:app.globalData.num
    });
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
    var list_str = wx.getStorageSync('cart');
    var num=0;
console.log(list_str);
list_str.forEach(list_str => {
  num=num+list_str.num;
});

console.log(num);
    const app = getApp()
    this.setData({
      userInfo: app.globalData.userInfo,
      shopcarcount:num
    });
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