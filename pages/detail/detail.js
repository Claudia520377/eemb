// pages/detail/detail.js
var app = getApp()
Page({


    data: {

        carts: [{
            cid: 1063,
            title: 'ER14250-VB',
            image: 'http://eemb.cn/assets/icons/ER14250-VB.png',
            num: 1,
            price: '20',
            sum: '20.0',
            selected: true,
            detail: 'ER1620 Li-MnO2 Battery Energy Type'
        }, ],
        minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
        /** 
         * 页面配置 
         */
        count: 0,
        winWidth: 0,
        winHeight: 0,
        // tab切换  
        currentTab: 0,
        currentTab1: 0,
        /* */
        showModalStatus: false
    },
    onLoad: function() {

        var that = this;
        /** 
         * 获取系统信息 
         */
        wx.getSystemInfo({
            success: function(res) {
                that.setData({

                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },
    span6: function(options) {
        wx.navigateTo({
            url: '../product/product',
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
    coupons: function() {
        wx.navigateTo({
            url: '/pages/receivecoupon/receivecoupon',
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
    // 跳到购物车
    toCar() {
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },
    addCar: function() {
        this.setData({
            showModalStatus: true
        })
    },

    bindcart() {
        var count = this.data.count;
        //console.log('input的数量：' + count);
        var cid = this.data.carts[0].cid; //获取商品的cid
        var carts = this.data.carts[0]; //获取carts数组
        carts.selected = true; //默认选择是false
        var num = carts.num; //商品的数量
        var detail = carts.detail; //商品的详情
        var title = carts.title; //商品的名称

        if (title.length > 13) { //判断如果名字标题大于13个字符，就显示...
            carts.title = title.substring(0, 13) + '...';
        }
        if (detail.length > 13) { //判断如果详细信息大于13个字符，就显示...
            carts.detail = detail.substring(0, 13) + '...';
        }
        //获取购物车的缓存数组（没有数据，则赋予一个空数组）
        var list_str = wx.getStorageSync('cart') || [];
        var isHave = false;
        list_str.forEach(function(element, index) {
            if (element.cid == cid) {
                // element.num = count;
                element.num = parseInt(element.num) + parseInt(count);
                isHave = true;
            }
        })
        if (!isHave) {
            carts.num = parseInt(count);
            list_str.push(carts);
        }
        //console.log(list_str);
        try {
            wx.setStorageSync('cart', list_str);
            // console.log(list_str);
        } catch (e) {
            console.log(e);
        }
        //关闭窗口
        wx.showToast({
            title: '加入成功！',
            icon: 'success',
            duration: 2000
        });
        // this.closeDialog();
        this.hideModal(); //隐藏模态框
        return;

    },
    /*跳回首页 */
    back() {
        wx.switchTab({
            url: '/pages/index/index'
        })
    },
    // 立即购买
    immeBuy() {
        var cid = this.data.carts[0].cid; //获取商品的cid
        var carts = this.data.carts[0]; //获取carts数组
        carts.selected = true; //默认选择是false
        var num = carts.num; //商品的数量
        var detail = carts.detail; //商品的详情
        var title = carts.title; //商品的名称
        if (title.length > 13) { //判断如果名字标题大于13个字符，就显示...
            carts.title = title.substring(0, 13) + '...';
        }
        if (detail.length > 13) { //判断如果详细信息大于13个字符，就显示...
            carts.detail = detail.substring(0, 13) + '...';
        }


        //console.log(carts)
        //获取购物车的缓存数组（没有数据，则赋予一个空数组）

        // var data = [carts]
        var list_str = wx.getStorageSync('cart') || [];
        var isHave = false;
        list_str.forEach(function(element, index) {
            if (element.cid == cid) {
                element.num = parseInt(element.num) + 1;
                isHave = true;
            }
        })
        if (!isHave) {
            list_str.push(carts);
        }
        //console.log(list_str);
        try {
            wx.setStorageSync('cart', list_str);
            // console.log(list_str);
        } catch (e) {
            console.log(e);
        }
        wx.navigateTo({
                url: '/pages/order_details/order_details',
            })
            // wx.showToast({
            //   title: '购买成功',
            //   icon: 'success',
            //   duration: 2000
            // });
    },

    /** 
     * 滑动切换tab 
     */
    bindChange: function(e) {
        var that = this;

        that.setData({
            currentTab: e.detail.current
        });
    },

    /** 
     * 点击tab切换 
     */
    swichNav: function(e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },

    /** 
     * 点击tab1切换 
     */
    swichNav1: function(e) {
        var that = this;
        if (this.data.currentTab1 === e.target.dataset.current1) {
            return false;
        } else {
            that.setData({
                currentTab1: e.target.dataset.current1
            })
        }
    },
    /*tab中的tab */
    bindChange1: function(e) {
        var that = this;

        that.setData({
            currentTab1: e.detail.current1
        });
    },

    //显示对话框
    showModal: function() {
        // 显示遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
            showModalStatus: true
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export()
            })
        }.bind(this), 1000)
    },
    //隐藏对话框
    hideModal: function() {
        // 隐藏遮罩层
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        })
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export(),
        })
        setTimeout(function() {
            animation.translateY(0).step()
            this.setData({
                animationData: animation.export(),
                showModalStatus: false
            })
        }.bind(this), 200)
    },

    minusCount: function(e) {
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.data.carts[index].num;

        // // 如果只有1件了，就不允许再减了
        if (num > 1) {
            num--;
        }
        // // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // // 购物车数据
        var carts = this.data.carts;
        carts[index].num = num;
        // // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        // // 将数值与状态写回
        this.setData({
            isdisplay: false,
            carts: carts,
            minusStatuses: minusStatuses
        });

    },
    addCount: function(e) {
        var index = parseInt(e.currentTarget.dataset.index);
        var num = this.data.carts[index].num;
        // 自增
        num++;
        // 只有大于一件的时候，才能normal状态，否则disable状态
        var minusStatus = num <= 1 ? 'disabled' : 'normal';
        // 购物车数据
        var carts = this.data.carts;
        carts[index].num = num;
        // 按钮可用状态
        var minusStatuses = this.data.minusStatuses;
        minusStatuses[index] = minusStatus;
        // 将数值与状态写回
        this.setData({
            isdisplay: false,
            carts: carts,
            minusStatuses: minusStatuses
        });

    },

    //弹出层input输入的值
    // bindKeyInput(e) {
    //     this.setData({
    //         inputValue: e.detail.value
    //     })
    // },
    bindManual: function(e) {
        var iname = e.target.dataset.iname;
        iname = e.detail.value;
        //console.log(iname);


        this.setData({
            count: iname
        });
    }
})