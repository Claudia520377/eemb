var app = getApp()
Page({
    data: {
        region: [],
        showTopTips: false,
        // customItem: '全部'
    },
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },
    fromsubmit(e) {
        var that = this
            //拼接地址对象
        var useraddress = e.detail.value
        var region = this.data.region.join(" ")
        useraddress.region = region
        useraddress.isdefault = false
            //console.log(useraddress)
        var reg = /^[1]\d{10}$/
        if (!useraddress.nickname) {
            app.showtips(that, "收件人不能为空");
            return;
        }
        if (!useraddress.telephone) {
            app.showtips(that, "请输入正确的电话");
            return;
        }
        if (!useraddress.detaileaddress) {
            app.showtips(that, "请输入详细地址");
            return;
        }
        app.showToast()

        //把地址对象添加到缓存里
        app.setAddress(useraddress);
        wx.navigateTo({
            url: `/pages/address/address`,
            success: function(res) {
                // console.log(res)
            }
        })
    }

})