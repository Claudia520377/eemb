Page({
  data: {
    cities: ["武汉", "北京", "深圳"],
    citiesIndex: 0,
    userBirthday: "请选择您的生日",
    showTopTips: false,
    city:"",
    tipes:""


  },

  // 地区选择
  bindCitiesChange: function (e) {
    var cities = this.data.cities
    // console.log(e)
    this.setData({
      citiesIndex: e.detail.value,
      city: cities[e.detail.value]
    })
  },

  // 日期选择
  bindDateChange: function (e) {
    this.setData({
      userBirthday: e.detail.value
    })
  },

  fromsubmit: function (e) {
    var that = this;
    var userInfo = e.detail.value
    var reg = /^[1]\d{10}$/
    if (!userInfo.username){
      that.showtips(that,'用户名不存在')
      return
    }
    if (!userInfo.usertelephone || !reg.test(userInfo.usertelephone) ){ 
      that.showtips(that,'电话不存在')
      return
    }
    if (!userInfo.userBirthday) {
      that.showtips(that,'日期不存在')
      return
    }
    if (!userInfo.userCity) {
      that.showtips(that,'地址不存在')
      return
    }
    this.showToast()

    try{
      wx.setStorageSync('userInfo', userInfo)
      wx.navigateTo({
        url: '/pages/profile/profile',
      })
    }catch(e){
      console.log('用户信息存储失败')
    }
    wx.switchTab({
      url: '/pages/profile/profile'
    })
  },

  //错误提示
  showtips(that,tipes){
    that.setData({
      showTopTips: true,
      tipes:tipes
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false,
        tipes:""
      });
    }, 1000);
    
  },
  //成功提示
  showToast(text,type) {
    wx.showToast({
      title: "保存成功",
      icon: "success",
      duration: 2000
    });

  }
})