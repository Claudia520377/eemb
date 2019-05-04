// pages/order_details/order_details.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        totalPrice: 0,
        isdefault: false
            //hasList: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.count_num();
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

        var that = this;
        try {
            //获取数量
            var num = 0;
            var list_str = wx.getStorageSync('cart')
                //console.log(list_str);
            list_str.forEach(list_str => {
                num = num + list_str.num;
            });
            // //获取地址信息
            var data = wx.getStorageSync('addressList') || [];
            //console.log(data);


            //console.log(num);
            // 同步接口立即返回值
            // 重新渲染数据
        } catch (e) {
            console.log('读取key发生错误')
        }
        //console.log(data)
        data.forEach(function(element) {
            if (element.isdefault == true) {
                //console.log(element);
                that.setData({
                    isdefault: element
                })
            }
        });


        //console.log(this.data);
        try {
            wx.setStorageSync('cart', list_str);
            //console.log(list_str);
            this.setData({
                // addressList: data,
                shopcarcount: num,
                list: list_str
            });
        } catch (e) {
            console.log('读取key发生错误')
        }

        //数量
        this.count_num();
        // 价格方法
        this.count_price();
        // wx.clearStorageSync();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    btn_submit: function() {
        wx.showModal({
            title: '提示',
            content: "暂未开发",
        })
    },
    /*绑定减数量事件*/
    btn_minus(e) {
        // 获取点击的索引
        const index = e.currentTarget.dataset.index;
        // 获取商品数据
        let list = this.data.list;
        // 获取商品数量
        let num = list[index].num;
        // 判断num小于等于1  return; 点击无效
        if (num <= 1) {
            return num = 1;
        }
        // else  num大于1  点击减按钮  数量--
        num = num - 1;
        list[index].num = num;

        //所有商品的数量
        let all_num = 0;
        // // 循环列表得到每个数据
        for (let i = 0; i < list.length; i++) {
            all_num += list[i].num;
        }
        try {
            wx.setStorageSync('cart', list);
        } catch (e) {
            console.log('读取key发生错误')
        }
        // 渲染页面
        this.setData({
            shopcarcount: all_num,
            list: list,
        });
        // 调用计算金额方法
        this.count_price();
    },
    /**
     * 绑定加数量事件
     */
    btn_add(e) {
        // 获取点击的索引
        const index = e.currentTarget.dataset.index;
        // 获取商品数据
        let list = this.data.list;
        // let shopcarcount = this.data.shopcarcount
        // 获取商品数量
        let num = list[index].num;
        // 点击递增
        num = num + 1;
        list[index].num = num;

        //所有商品的数量
        let all_num = 0;
        // // 循环列表得到每个数据
        for (let i = 0; i < list.length; i++) {
            all_num += list[i].num;
        }


        try {
            wx.setStorageSync('cart', list);

        } catch (e) {
            console.log('读取key发生错误')
        }
        // 重新渲染 ---显示新的数量
        this.setData({
            shopcarcount: all_num,
            list: list,
            // shopcarcount: shopcarcount
        });
        // 计算金额方法
        this.count_price();
        // console.log(totalcount)
        // app.globalData.shopcarcount = shopcarcount;
        // console.log(app.globalData.shopcarcount)
        // this.setData({
        //   shopcarcount: shopcarcount
        // })
    },
    /**
     * 计算总价
     */
    count_price() {
        // 获取商品列表数据
        let list = this.data.list;

        // 声明一个变量接收数组列表price
        let total = 0;

        // 循环列表得到每个数据
        for (let i = 0; i < list.length; i++) {
            // 判断选中计算价格
            if (list[i].selected) {
                // 所有价格加起来 count_money
                total += list[i].num * list[i].price;
            }
        }
        // 最后赋值到data中渲染到页面
        this.setData({
            list: list,
            totalPrice: total.toFixed(2),

        });
    },
    count_num() {
        var that = this
            // let shopcarcount = this.data.shopcarcount;
        let list = this.data.list;
        for (let i = 0; i < list.length; i++) {
            // shopcarcount += list[i].num
        }

        this.setData({
            list: list,
            // shopcarcount: shopcarcount
        });
        // 购物车数量
        // app.globalData.shopcarcount = shopcarcount;
        // console.log(app.globalData.shopcarcount)
    },
    /*添加地址 */
    img_url: function() {
        wx.navigateTo({
            url: '../address/address',
        })
    },
    /*点击图片跳转到详情页 */
    jump_detail: function() {
        wx.navigateTo({
            url: '../detail/detail',
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
    },
    //购物车input框
    bindManual: function(e) {
        var iname = e.target.dataset.iname;
        iname = parseInt(e.detail.value);

        var id = e.currentTarget.dataset.index;
        //console.log(id);
        var cart = wx.getStorageSync('cart') || [];
        if (cart) {
            for (var i = 0; i < cart.length; i++) {
                var cartObj = cart[i];
                //console.log(cartObj);
                if (cartObj.cid == id + 1) {
                    cartObj.num = iname;
                }
            }
        }
        //所有商品的数量
        var all_num = 0;
        // // 循环列表得到每个数据
        for (var i = 0; i < cart.length; i++) {
            all_num += cart[i].num;
        }
        try {
            wx.setStorageSync('cart', cart);

        } catch (e) {
            console.log('读取key发生错误')
        }
        // 重新渲染 ---显示新的数量
        this.setData({
            shopcarcount: all_num,
            list: cart
        });
        // 计算金额方法
        this.count_price();
    },
})