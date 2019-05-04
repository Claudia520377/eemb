var app = getApp()
var formatTime = require('../../utils/util.js')
Page({
    data: {
        // cities: ["武汉", "北京", "深圳"],
        // city:"",
        region: [],
        // customItem: '全部',
        citiesIndex: 0,
        userBirthday: "请选择您的生日",
        showTopTips: false,
        tipes: "",
        endTime: "",
        startDate: "1919-01-01",
    },

    // 地区选择
    bindCitiesChange: function(e) {
        var cities = this.data.cities
            // console.log(e)
        this.setData({
            citiesIndex: e.detail.value,
            city: cities[e.detail.value]
        })
    },
    // 地区选择
    bindRegionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },

    // 日期选择
    bindDateChange: function(e) {
        this.setData({
            userBirthday: e.detail.value
        })
    },

    fromsubmit: function(e) {
        var that = this;
        var userInfo = e.detail.value;
        userInfo.userBirthday = that.data.userBirthday;
        userInfo.city = that.data.city;
        //console.log(userInfo)
        var reg = /^[1]\d{10}$/
        if (!userInfo.username) {
            app.showtips(that, '用户名不存在')
            return
        }
        if (!userInfo.usertelephone || !reg.test(userInfo.usertelephone)) {
            app.showtips(that, '电话不存在')
            return
        }
        if (!userInfo.userBirthday) {
            app.showtips(that, '日期不存在')
            return
        }
        if (!userInfo.city) {
            app.showtips(that, '地址不存在')
            return
        }
        app.showToast()

        try {
            wx.setStorageSync('userInfo', userInfo)
            wx.navigateTo({
                url: '/pages/profile/profile',
            })
        } catch (e) {
            console.log('用户信息存储失败')
        }
        wx.switchTab({
            url: '/pages/profile/profile'
        })
    },
    onShow: function(e) {
        var endTime = formatTime.formatTime(new Date());
        this.setData({
                endTime: endTime
            })
            //console.log(endTime)
    }
})