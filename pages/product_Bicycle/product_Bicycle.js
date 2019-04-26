// pages/product_Bicycle/product_Bicycle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productList: {

      V36: [
        { eid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '36V电动自行车', price: '0.133$', sales: '26710' },
        { eid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '36V电动自行车', price: '0.133$', sales: '26710' },
        { eid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '36V电动自行车', price: '0.133$', sales: '26710' },
        { eid: 4, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '36V电动自行车', price: '0.133$', sales: '26710' },
      ]
      ,
      V48: [
        { cid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '48V电动自行车', price: '0.133$', sales: '26710' },
        { cid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '48V电动自行车', price: '0.133$', sales: '26710' },
        { cid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '48V电动自行车', price: '0.133$', sales: '26710' },

      ]
      ,
      V60: [
        { lid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '60V电动自行车', price: '0.133$', sales: '26710' },
        { lid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '60V电动自行车', price: '0.133$', sales: '26710' },
        { lid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '60V电动自行车', price: '0.133$', sales: '26710' },
        { lid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '60V电动自行车', price: '0.133$', sales: '26710' },

      ]
      ,
      V72: [
        { hid: 1, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
        { hid: 2, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
        { hid: 3, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
        { hid: 4, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
        { hid: 5, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
        { hid: 6, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
        { hid: 7, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
        { hid: 8, url: '/pages/detail/detail', image: 'http://eemb.cn/assets/icons/so2.png', name: '72V电动自行车', price: '0.133$', sales: '26710' },
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
    this.data.productList.product = this.data.productList.V36;
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
  onShow: function () {
    this.data.productList.product = this.data.productList.V36;
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