// pages/box/box.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    navActive: '0',
    data:{},
    // data: {
    //   orderNum: 22,
    //   sales: 33,
    //   activeBox: 12,
    //   activeUser: 14,
    //   item: [{
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 1
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 2
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 3
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 4
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 5
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 6
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 7
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 8
    //   }, {
    //     goodName: '亲嘴烧',
    //     goodPic: '../../image/snack/food.png',
    //     price: 18.8,
    //     goodUnit: "份",
    //     orderNum: 9
    //   }]
    // },
    category: [{
      categoryName: "早餐面包",
      categoryItem: [{
        goodName: '亲嘴烧',
        img: '../../image/snack/food.png',
        price: 18.8,
        goodUnit: "份"
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   //this.getSnackOrderSaleNum('2018/09/03','2018/09/06');
   //this.getSnackOrderGoodCount('2018/09/03', '2018/09/05');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getSnackOrderSaleNum(0);
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  chooseTime: function(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.flag = true;
    this.setData({
      navActive: index
    });


      this.getSnackOrderSaleNum(index);

  },


  getSnackOrderSaleNum: function(index) {
    const self = this;

    this.setData({
      data: {},
    });

    wx.showToast({
      title: '',
      icon: "loading",
      duration: 5000
    })

    var year = new Date().getFullYear()
    var month = new Date().getMonth() + 1
    var day = new Date().getDate()

    if (index == '0') {
      console.log("今日");
      var beginDate = [year, month, day].map(this.formatNumber).join('/');
      var endDate = [year, month, day + 1].map(this.formatNumber).join('/');

    } else if (index == '1') {
      console.log("昨日");
      var beginDate = [year, month, day - 1].map(this.formatNumber).join('/');
      var endDate = [year, month, day].map(this.formatNumber).join('/');

    } else {
      console.log("本月");
      var beginDate = [year, month, 1].map(this.formatNumber).join('/');
      var endDate = [year, month, day + 1].map(this.formatNumber).join('/');
    }

    wx.request({
      url: app.globalData.serverIp + 'getSnackOrderSaleNum.do',
      data: {
        beginDate: beginDate,
        endDate: endDate
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        self.setData({
          data: res.data
        })
        wx.hideToast();
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },


  formatNumber: function (n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  getSnackOrderGoodCount: function(beginDate, endDate) {
    const self = this;
    wx.request({
      url: app.globalData.serverIp + 'getSnackOrderGoodCount.do',
      data: {
        beginDate: beginDate,
        endDate: endDate
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        self.setData({
          countData : res.data
        })
        console.log(res.data);
        console.log('count:' + res.data);
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  }

})