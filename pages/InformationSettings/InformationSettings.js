Page({
  data: {
    cities: ["武汉", "北京", "深圳"],
    citiesIndex: 0,
    userBirthday: "请输入您的生日",
    showTopTips: false,
    city:""

  },

  // 地区选择
  bindCitiesChange: function (e) {
    var cities = this.data.cities
    console.log(e)
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
    console.log(e)
    // this.setData({
    //   showTopTips: true
    // });
    // setTimeout(function () {
    //   that.setData({
    //     showTopTips: false
    //   });
    // }, 3000);



    var userInfo = e.detail.value
    var reg = / \w[11]/ 
    
    // console.log(userInfo)
    try{
      wx.setStorageSync('userInfo', userInfo)
    }catch(e){
      console.log('用户信息存储失败')
    }
  },

  




})