// pages/product/product.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    productList: {

      ER: [
        { eid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/ER14250.jpg', name: 'ER14250', price: '0.133$', sales: '26710' },
        { eid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/ER14250.png', name: 'ER14250', price: '0.133$', sales: '26710' },
        { eid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/ER14250-AX.png', name: 'ER14250-AX', price: '0.133$', sales: '26710' },
        { eid: 4, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/ER14250-VB.png', name: 'ER14250-VB', price: '0.133$', sales: '26710' },
      ]
      ,
      CR: [
        { cid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/CR1620.png', name: 'CR1620', price: '0.133$', sales: '26710' },
        { cid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/CR2032-PEN3.png', name: 'CR2032-PEN3', price: '0.133$', sales: '26710' },
        { cid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/CR2450-VAY3.png', name: 'CR2450-VAY3', price: '0.133$', sales: '26710' },

      ]
      ,
      LP: [
        { lid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP103395.png', name: 'LP103395', price: '0.133$', sales: '26710' },
        { lid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP402535.png', name: 'LP402535', price: '0.133$', sales: '26710' },
        { lid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP402535-PCM-NTC-LD.png', name: 'LP402535-PCM-NTC-LD', price: '0.133$', sales: '26710' },
        { lid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP653042.png', name: 'LP653042', price: '0.133$', sales: '26710' },

      ]
      ,
      Hot_Sale: [
        { hid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/CR1620.png', name: 'CR1620', price: '0.133$', sales: '26710' },
        { hid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/ER14250.png', name: 'ER14250', price: '0.133$', sales: '26710' },
        { hid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP103395.png', name: 'LP103395', price: '0.133$', sales: '26710' },
        { hid: 4, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP402535.png', name: 'LP402535', price: '0.133$', sales: '26710' },
        { hid: 5, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/ER14250-VB.png', name: 'ER14250-VB', price: '0.133$', sales: '26710' },
        { hid: 6, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/CR2450-VAY3.png', name: 'CR2450-VAY3', price: '0.133$', sales: '26710' },
        { hid: 7, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP653042.png', name: 'LP653042', price: '0.133$', sales: '26710' },
        { hid: 8, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/LP402535-PCM-NTC-LD.png', name: 'LP402535-PCM-NTC-LD', price: '0.133$', sales: '26710' },

      ],
      product: [
      ]

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //默认产品页的展示页面为最热数据
    this.data.productList.product = this.data.productList.Hot_Sale;
    //获取首页传递的参数名字
    var name = options.name;
    var productList = this.data.productList
    productList.product = this.data.productList[name];
    this.setData({
      productList: this.data.productList
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {

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
  /*搜索框 */
  showSearchHandle() {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle() {
    this.setData({ searchText: '', searchShowed: false })
  },
  btn_type: function (e) {
    var this_type = e.currentTarget.dataset.type;
    //console.log(this_type);
    this.data.productList.product = this.data.productList[this_type];
    this.setData({
      productList: this.data.productList
    })
  }
})