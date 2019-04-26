// page/component/new-pages/cart/cart.js
// 默认请求第一页
var numbers = 1;
var bool = true;
var app = getApp()
Page({
  data: {
    show_edit: "block",
    edit_name: "编辑",
    edit_show: "none",
    hasList: true,
    list: [],
    totalPrice: 0,
    shopcarcount: 0,
    selectAllStatus: true,
  },
//点击图片跳转详情页
  img_product: function () {
    wx.navigateTo({
      url: '../detail/detail',
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
  onShow() {
    wx.showToast({
      title: '加载中',
      icon: "loading",
      duration: 1000
    })

    try {
      var list_str = wx.getStorageSync('cart')
      console.log(list_str);
      // 同步接口立即返回值
      // 重新渲染数据
      this.setData({
        list: list_str
      });
    } catch (e) {
      console.log('读取key发生错误')
    }
    try{
      wx.setStorageSync('cart', list_str);
    }catch(e){
      console.log('读取key发生错误')
    }
    //数量
    this.count_num();
    // 价格方法
    this.count_price();

  },

  onLoad() {
    this.count_num();
  },
  /**
   * 当前商品选中事件
   */
  selectList(e) {
    var that = this;
    // 获取选中的radio索引
    var index = e.currentTarget.dataset.index;
    // 获取到商品列表数据
    var list = that.data.list;
    that.data.selectAllStatus = true;
    list[index].selected = !list[index].selected;
    for (var i = list.length - 1; i >= 0; i--) {
      if (!list[i].selected) {
        that.data.selectAllStatus = false;
        break;
      }
    }
    // 重新渲染数据
    that.setData({
      list: list,
      selectAllStatus: that.data.selectAllStatus
    })
    // 调用计算金额方法
    that.count_price();
  },
  // 编辑
  btn_edit: function () {
    var that = this;
    if (bool) {
      that.setData({
        edit_show: "block",
        edit_name: "取消",
        show_edit: "none"
      })
      bool = false;
    } else {
      that.setData({
        edit_show: "none",
        edit_name: "编辑",
        show_edit: "block"
      })
      bool = true;
    }

  },
  // 删除
  deletes: function (e) {
    var that = this;
    // 获取索引
    const index = e.currentTarget.dataset.index;

    // 获取商品列表数据
    let list = this.data.list;
    let num = list[index].num
    // console.log(num)
    let shopcarcount = this.data.shopcarcount
    wx.showModal({
      title: '提示',
      content: '确认删除吗',
      success: function (res) {
        if (res.confirm) {
          // 删除索引从1
          list.splice(index, 1);
          shopcarcount -=
            // 页面渲染数据
            that.setData({
              list: list
            });
          app.globalData.shopcarcount -= num;
          console.log(app.globalData.shopcarcount)

          // 如果数据为空
          if (!list.length) {
            that.setData({
              hasList: false
            });
          } else {
            // 调用金额渲染数据
            that.count_price();
          }
        } else {
          console.log(res);
        }
      },
      fail: function (res) {
        console.log(res);
      }
    })
  },



  /**
   * 购物车全选事件
   */
  selectAll(e) {
    // 全选ICON默认选中
    let selectAllStatus = this.data.selectAllStatus;
    // true  -----   false
    selectAllStatus = !selectAllStatus;
    // 获取商品数据
    let list = this.data.list;
    let totalcount = this.data.totalcount;
    // 循环遍历判断列表中的数据是否选中
    for (let i = 0; i < list.length; i++) {
      list[i].selected = selectAllStatus;
    }
    // 页面重新渲染
    this.setData({
      selectAllStatus: selectAllStatus,
      list: list,
      totalcount: totalcount
    });
    // 计算金额方法
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
    let shopcarcount = this.data.shopcarcount
    // 获取商品数量
    let num = list[index].num;
    // 点击递增
    num = num + 1;
    list[index].num = num;
    shopcarcount += 1
    //  console.log(list[index].num)
     try{
      wx.setStorageSync('cart', list);
    }catch(e){
      console.log('读取key发生错误')
    }
    // 重新渲染 ---显示新的数量
    this.setData({
      list: list,
      shopcarcount: shopcarcount
    });
    // 计算金额方法
    this.count_price();
    // console.log(totalcount)
    app.globalData.shopcarcount = shopcarcount;
    // console.log(app.globalData.shopcarcount)
    // this.setData({
    //   shopcarcount: shopcarcount
    // })
  },
  onShow1: function (object) {
    let _this = this;
    _this.setData({
      isShowCav: true
    })
    wx.downloadFile({
      url: object.avatarurl,
      success: function (sres) {
        _this.setData({
          canvasUserPic: sres.tempFilePath
        });
        wx.downloadFile({
          url: object.show_img,
          success: function (sres1) {
            _this.setData({
              canvasShowImg: sres1.tempFilePath
            });
            _this.canvas(object);
          }
        })
      }
    })
  },
  /**
   * 绑定减数量事件
   */
  btn_minus(e) {
    //   // 获取点击的索引
    const index = e.currentTarget.dataset.index;
    // 获取商品数据
    let list = this.data.list;
    let shopcarcount = this.data.shopcarcount;
    // 获取商品数量
    let num = list[index].num;
    // 判断num小于等于1  return; 点击无效
    if (num <= 1) {
      return false;
    }
    // else  num大于1  点击减按钮  数量--
    num = num - 1;
    list[index].num = num;
    shopcarcount -= 1;
    try{
      wx.setStorageSync('cart', list);
    }catch(e){
      console.log('读取key发生错误')
    }
    // 渲染页面
    this.setData({
      list: list,
      shopcarcount: shopcarcount
    });
    // 调用计算金额方法
    this.count_price();
    // console.log(totalcount);
    app.globalData.shopcarcount = shopcarcount;
    // console.log(app.globalData.shopcarcount)
  },
  // 提交订单
  btn_submit_order: function () {
    var that = this;
    // console.log(that.data.totalPrice);

    // 调起支付
    // wx.requestPayment(
    //   {
    //     'timeStamp': '',
    //     'nonceStr': '',
    //     'package': '',
    //     'signType': 'MD5',
    //     'paySign': '',
    //     'success': function (res) { },
    //     'fail': function (res) { },
    //     'complete': function (res) { }
    //   })
    wx.showModal({
      title: '提示',
      content: '合计金额-' + that.data.totalPrice + "暂未开发",
    })
  },
  // 收藏
  btn_collert: function () {
    wx.showToast({
      title: '收藏暂未开发',
      duration: 2000
    })
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
    let shopcarcount = this.data.shopcarcount;
    let list = this.data.list;
    for (let i = 0; i < list.length; i++) {
      shopcarcount += list[i].num
    }

    this.setData({
      list: list,
      shopcarcount: shopcarcount
    });
    // 购物车数量
    app.globalData.shopcarcount = shopcarcount;
    // console.log(app.globalData.shopcarcount)
  },


  // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    console.log(that.data);
    console.log(that.data.types_id);
    console.log(that.data.sel_name);
    // wx.request({
    //   url: host + '请求后台数据地址',
    //   method: "post",
    //   data: {
    //     // 刷新显示最新数据
    //     page: 1,
    //   },
    //   success: function (res) {

    //     // console.log(res.data.data.datas);
    //     that.setData({
    //       list: res.data.data.datas
    //     })
    //   }
    // })

    // 隐藏导航栏加载框  
    wx.hideNavigationBarLoading();
    // 停止下拉动作  
    wx.stopPullDownRefresh();

  },

  // 加载更多
  // onReachBottom: function () {
  //   var that = this;
  //   // 显示加载图标  
  //   wx.showLoading({
  //     title: '正在加载中...',
  //   })
  //   numbers++;

  //   // 页数+1  
  //   wx.request({
  //     url: host + '后台数据地址',
  //     method: "post",
  //     data: {
  //     // 分页
  //       page: numbers,
  //     },
  //     // 请求头部  
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: function (res) {
  //       // 回调函数 

  //       var num = res.data.data.datas.length;
  //       // console.log(num);
  //       // 判断数据长度如果不等于0，前台展示数据，false显示暂无订单提示信息
  //       if (res.data.data.status == 0) {

  //         for (var i = 0; i < res.data.data.datas.length; i++) {
  //           that.data.list.push(res.data.data.datas[i]);
  //         }
  //         // 设置数据  
  //         that.setData({
  //           list: that.data.list
  //         })

  //       } else {
  //         wx.showToast({ title: '没有更多了', icon: 'loading', duration: 2000 })
  //       }


  //       // 隐藏加载框  
  //       wx.hideLoading();
  //     }
  //   })

  // }
})