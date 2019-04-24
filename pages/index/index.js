//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: {
      product:[
      { pid: 1, url: '/pages/product/product', image: 'http://eemb.cn/assets/icons/CR1620.png', name: 'CR' },
      { pid: 2, url: '/pages/product/product', image: 'http://eemb.cn/assets/icons/ER14250.jpg', name: 'ER' },
      { pid: 3, url: '/pages/product/product', image: 'http://eemb.cn/assets/icons/LP103395.png', name: 'LP' },
      { pid: 4, url: '/pages/product/product', image: 'http://eemb.cn/assets/icons/ER14250.png', name: 'Hot_Sale' },
      ],
   
    },
    hot:[
      { hid: 1, url: '../detail/detail', image: 'http://eemb.cn/assets/icons/CR1620.png', name: 'CR' },
      { hid: 2, url: '../detail/detail', image: 'http://eemb.cn/assets/icons/ER26500-FT.jpg', name: 'ER' },
      { hid: 3, url: '../detail/detail', image: 'http://eemb.cn/assets/icons/LP401730.jpg', name: 'LP' },
      { hid: 4,  url: '../detail/detail',image: 'http://eemb.cn/assets/icons/LP401730-PCM-NTC-LD.jpg', name: 'Hot' },
    ]

    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.request({
    //   // url: 'https://URL',
    //   url: '',
    //   data: {},
    //   method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //   // header: {}, // 设置请求的 header
    //   success: function (res) {
    //     // success
    //   },
    //   fail: function () {
    //     // fail
    //   },
    //   complete: function () {
    //     // complete
    //   }
    // })
    //1.发送异步请求不再是web那套ajax
    //2.没有跨域
    //3.请求的地址必须在管理员后台添加白名单
    //4.域名必须备案、服务端必须采用HTTPS

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

  },
  /*搜索框功能 */
  showSearchHandle() {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle() {
    this.setData({ searchText: '', searchShowed: false })
  },
})
