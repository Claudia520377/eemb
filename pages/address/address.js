var app = getApp()
Page({
    data: {
        addressList: []

    },

    // 更改默认地址
    changeaddress(e) {
        let that = this
        let currentIndex = e.currentTarget.dataset.index
        app.setAddress(undefined, currentIndex)
        this.init()
    },
    //删除地址
    deleteaddress(e) {
        var that = this
        let index = e.currentTarget.dataset.index;
        let addressList = this.data.addressList;
        //删除对应的缓存数据
        app.setAddress(undefined, undefined, index)
        that.init()
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(option) {
        this.init()
    },
    onShow: function(option) {
        this.init()

    },
    init: function() {
        var that = this
        try {
            var data = wx.getStorageSync('addressList') || []
            if (data) {
                that.setData({
                    addressList: data
                })
                console.log(data);
            }
        } catch (e) {
            console.log(获取缓存失败)
        }
        try {
            wx.setStorageSync('addressList', data);

        } catch (e) {
            console.log('读取key发生错误')
        }
    },
    /*点击选中的地址，会跳转到支付订单页面 */
    order_address: function() {
        wx.navigateTo({
            url: '/pages/order_details/order_details',
            success: function(res) {
                // success
            },
            fail: function() {
                // fail
            },
            complete: function() {
                // complete
            }
        })
    }
})