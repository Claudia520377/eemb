// pages/detail/detail.js
var app = getApp()
Page({
  span6: function (options) {
    wx.navigateTo({
      url: '../product/product',
      success: function (res) {
        // success
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  coupons:function(){
wx.navigateTo({
  url: '/pages/receivecoupon/receivecoupon',
  success: function(res){
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
  addCar: function () {
    this.setData({
      showModalStatus: true
    })
  },
  /*bindcart弹窗数量的确定按钮 */
  bindcart: function (e) {
    var goods = this.data.goods;
    goods.isSelect = false;
    var num = this.data.goods.num;
    var title = this.data.goods.title;
    if (title.length > 13) {
      goods.title = title.substring(0, 13) + '...';
    }
    // 获取购物车的缓存数组（没有数据，则赋予一个空数组）  
    var arr = wx.getStorageSync('cart') || [];
    console.log("arr,{}", arr);
    if (arr.length > 0) {
      // 遍历购物车数组  
      for (var j in arr) {
        // 判断购物车内的item的id，和事件传递过来的id，是否相等  
        if (arr[j].goodsId == goodsId) {
          // 相等的话，给count+1（即再次添加入购物车，数量+1）  
          arr[j].num = arr[j].num + 1
          // 最后，把购物车数据，存放入缓存（此处不用再给购物车数组push元素进去，因为这个是购物车有的，直接更新当前数组即可）  
          try {
            wx.setStorageSync('cart', arr)
          } catch (e) {
            console.log(e)
          }
          //关闭窗口
          wx.showToast({
            title: '加入购物车成功！',
            icon: 'success',
            duration: 2000
          });
          this.closeDialog();
          // 返回（在if内使用return，跳出循环节约运算，节约性能） 
          return;
        }
      }
      // 遍历完购物车后，没有对应的item项，把goodslist的当前项放入购物车数组  
      arr.push(goods);
    } else {
      arr.push(goods);
    }
    // 最后，把购物车数据，存放入缓存  
    try {
      wx.setStorageSync('cart', arr)
      // 返回（在if内使用return，跳出循环节约运算，节约性能） 
      //关闭窗口
      wx.showToast({
        title: '加入购物车成功！',
        icon: 'success',
        duration: 2000
      });
      this.closeDialog();
      return;
    } catch (e) {
      console.log(e)
    }
  },
  bindcart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  /*跳回首页 */
  back() {
    wx.switchTab({
      url: '/pages/index/index'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },


  data: {

    carts: [
      { cid: 1063, title: 'ER14250-VB', image: 'http://eemb.cn/assets/icons/ER14250-VB.png', num: '1', price: '20', sum: '20.0', selected: true,detail:'ER1620 Li-MnO2 Battery Energy Type' },
    ],
    minusStatuses: ['disabled', 'disabled', 'normal', 'normal', 'disabled'],
    /** 
        * 页面配置 
        */
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    currentTab1: 0,

    /* */
    showModalStatus: false
  },
  onLoad: function () {
    
    var that = this;
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({

          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  /** 
    * 滑动切换tab 
     */
  bindChange: function (e) {
    var that = this;

    that.setData({ currentTab: e.detail.current });
  },

  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {
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
  swichNav1: function (e) {
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
  bindChange1: function (e) {
    var that = this;

    that.setData({ currentTab1: e.detail.current1 });
  },

  //显示对话框
  showModal: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  //隐藏对话框
  hideModal: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },

  minusCount: function (e) {
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
  addCount: function (e) {
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


})

