//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo:{
      username: "成成", //用户名称
      usergrade:"普通会员",//会员等级
      balance:"1100", //用户余额
      points:"20.00" //用户积分
    },
    coupon:[
      {nouse:[]},
      {used:[]},
      {expired: [] }
    ],
    // num:0 占时不用
  },
  //操作缓存地址
  setAddress(useraddress, defaultAddressIndex, deleteaddressIndex, edtaileaddressIndex) {
    try {
      var addressList = wx.getStorageSync('addressList') || []

      if (addressList) {
        //添加地址对象
        if (useraddress !== undefined && edtaileaddressIndex === undefined) {
          addressList.push(useraddress)
        }
        //修改默认地址
        if (defaultAddressIndex !== undefined) {
          console.log(11)
          let previous = " "
          for (let i = 0; i < addressList.length; i++) {
            let obj = addressList[i]
            if (obj.isdefault) {
              previous = i;
            }
            obj.isdefault = false
          }
          if (defaultAddressIndex !== previous) {
            addressList[defaultAddressIndex].isdefault = !addressList[defaultAddressIndex].isdefault;
          }
        }
        //删除地址
        if (deleteaddressIndex !== undefined) {
          addressList.splice(deleteaddressIndex, 1)
        }
        //修改地址
        if (addressList !== undefined && edtaileaddressIndex !== undefined) {
          var obj = addressList[edtaileaddressIndex]
          useraddress.isdefault = obj.isdefault

          addressList[edtaileaddressIndex] = useraddress
        }

        wx.setStorageSync('addressList', addressList)
      }
    } catch (e) {
      console.log('添加报错')
    }
  },
  //错误提示
  showtips(that, tipes) {
    that.setData({
      showTopTips: true,
      tipes: tipes
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false,
        tipes: ""
      });
    }, 1000);

  },
  //成功提示
  showToast(text, type) {
    wx.showToast({
      title: "保存成功",
      icon: "success",
      duration: 2000
    });

  },
})