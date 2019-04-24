const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // navData: ["全部", "代付款", "代发货", "待收货", "已完成", "退换货", "回收站"],
    navData: [
      {
        text: "全部",
        orderDetails: [
          { OrderID: '11111', img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 },
          { OrderID: '222222', img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 }
        ]
      },
      {
        text: "代付款",
        orderDetails: [
          { OrderID: '33333333333', img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 },
          { OrderID: '4444444444', img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 }
        ]

      },
      {
        text: "代发货",
        orderDetails: [
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 },
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 }
        ]
      },
      {
        text: "待收货",
        orderDetails: [
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 },
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 }
        ]
      },
      {
        text: "已完成",
        orderDetails: [
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 },
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 }
        ]
      },
      {
        text: "退换货",
        orderDetails: [
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 },
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 }
        ]
      },
      {
        text: "回收站",
        orderDetails: [
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 },
          { OrderID: 456465546456, img: "/assets/nav_01.png", model: "cr", price: 49.00, num: 2, finallprice: 98 }
        ]
      }
    ],
    currentTab: 0,
    navScrollLeft: 0
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          pixelRatio: res.pixelRatio,
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      },
    })
  },
  switchNav(event) {
    var cur = event.currentTarget.dataset.current;
    //每个tab选项宽度占1/5
    var singleNavWidth = this.data.windowWidth / 5;
    //tab选项居中                            
    this.setData({
      navScrollLeft: (cur - 2) * singleNavWidth
    })
    if (this.data.currentTab == cur) {
      return false;
    } else {
      this.setData({
        currentTab: cur
      })
    }
  },
  switchTab(event) {
    var cur = event.detail.current;
    var singleNavWidth = this.data.windowWidth / 5;
    this.setData({
      currentTab: cur,
      navScrollLeft: (cur - 2) * singleNavWidth
    });
  },
  cancelbtn(e) {
    var OrderID = e.currentTarget.dataset.oderdetailer.OrderID;
    var navData = this.data.navData
    for (var i = 0; i < navData.length; i++) {
      var orderDetails = navData[i].orderDetails
      for (var j = 0; j < orderDetails.length; j++) {
        var obj = orderDetails[j]
        if (obj.OrderID === OrderID) {
          orderDetails.splice(j, 1)
          orderDetails = navData[i].orderDetails
          this.setData({
            navData: navData

          })
        }
      }
    }
    // console.log(navData)
  },
  paybtn: function (option) {
    console.log(option)
  }
})
