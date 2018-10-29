// pages/box/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: '0',
    countData: {
      goodNum: 0,
      initialGoodQuantity: 0,
      residualGoodQuantity: 0
    },
    boxs: [{
      boxId: '000000',
      school: '广州中医药大学 ',
      dormitory: 'K栋',
      room: '343',
      sex: '男',
      grade: '大二',
      attendDate: '20180809133420',
      attendDateDay: '08月09日',
      attendDateTime: '13:34:20',
      lastSuppleDate: '20180809133420',
      lastSuppleDateDay: '08月09日',
      lastSuppleDateTime: '13:34:20',
      lastPurchaseDate: '20180810143920',
      lastPurchaseDateDay: '08月09日',
      lastPurchaseDateTime: '13:34:20',
      goodsNum: '40',
      sellNum: '30',
      sellRatio: '0.75'
    }, {
      boxId: '000000',
      school: '广州中医药大学 ',
      dormitory: 'K栋',
      room: '343',
      sex: '男',
      grade: '大二',
      attendDate: '20180809133420',
      attendDateDay: '08月09日',
      attendDateTime: '13:34:20',
      lastSuppleDate: '20180809133420',
      lastSuppleDateDay: '08月09日',
      lastSuppleDateTime: '13:34:20',
      lastPurchaseDate: '20180810143920',
      lastPurchaseDateDay: '08月09日',
      lastPurchaseDateTime: '13:34:20',
      goodsNum: '40',
      sellNum: '30',
      sellRatio: '0.75'
    }, {
      boxId: '000000',
      school: '广州中医药大学 ',
      dormitory: 'K栋',
      room: '343',
      sex: '男',
      grade: '大二',
      attendDate: '20180809133420',
      attendDateDay: '08月09日',
      attendDateTime: '13:34:20',
      lastSuppleDate: '20180809133420',
      lastSuppleDateDay: '08月09日',
      lastSuppleDateTime: '13:34:20',
      lastPurchaseDate: '20180810143920',
      lastPurchaseDateDay: '08月09日',
      lastPurchaseDateTime: '13:34:20',
      goodsNum: '40',
      sellNum: '30',
      sellRatio: '0.75'
    }, {
      boxId: '000000',
      school: '广州中医药大学 ',
      dormitory: 'K栋',
      room: '343',
      sex: '男',
      grade: '大二',
      attendDate: '20180809133420',
      attendDateDay: '08月09日',
      attendDateTime: '13:34:20',
      lastSuppleDate: '20180809133420',
      lastSuppleDateDay: '08月09日',
      lastSuppleDateTime: '13:34:20',
      lastPurchaseDate: '20180810143920',
      lastPurchaseDateDay: '08月09日',
      lastPurchaseDateTime: '13:34:20',
      goodsNum: '40',
      sellNum: '30',
      sellRatio: '0.75'
    }, {
      boxId: '000000',
      school: '广州中医药大学 ',
      dormitory: 'K栋',
      room: '343',
      sex: '男',
      grade: '大二',
      attendDate: '20180809133420',
      attendDateDay: '08月09日',
      attendDateTime: '13:34:20',
      lastSuppleDate: '20180809133420',
      lastSuppleDateDay: '08月09日',
      lastSuppleDateTime: '13:34:20',
      lastPurchaseDate: '20180810143920',
      lastPurchaseDateDay: '08月09日',
      lastPurchaseDateTime: '13:34:20',
      goodsNum: '40',
      sellNum: '30',
      sellRatio: '0.75'
    }, {
      boxId: '000000',
      school: '广州中医药大学 ',
      dormitory: 'K栋',
      room: '343',
      sex: '男',
      grade: '大二',
      attendDate: '20180809133420',
      attendDateDay: '08月09日',
      attendDateTime: '13:34:20',
      lastSuppleDate: '20180809133420',
      lastSuppleDateDay: '08月09日',
      lastSuppleDateTime: '13:34:20',
      lastPurchaseDate: '20180810143920',
      lastPurchaseDateDay: '08月09日',
      lastPurchaseDateTime: '13:34:20',
      goodsNum: '40',
      sellNum: '30',
      sellRatio: '0.75'
    }, {
      boxId: '000000',
      school: '广州中医药大学 ',
      dormitory: 'K栋',
      room: '343',
      sex: '男',
      grade: '大二',
      attendDate: '20180809133420',
      attendDateDay: '08月09日',
      attendDateTime: '13:34:20',
      lastSuppleDate: '20180809133420',
      lastSuppleDateDay: '08月09日',
      lastSuppleDateTime: '13:34:20',
      lastPurchaseDate: '20180810143920',
      lastPurchaseDateDay: '08月09日',
      lastPurchaseDateTime: '13:34:20',
      goodsNum: '40',
      sellNum: '30',
      sellRatio: '0.75'
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var e = {
      currentTarget: {
        dataset: {}
      }
    };
    e.currentTarget.dataset.index = '0';
    this.chooseTitle(e);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  bindtapNavigate:function(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },


  chooseTitle: function(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      navActive: index
    });

    wx.request({
      url: app.globalData.serverIp + 'SelBox.do',
      data: {
        orderParam: "boxId",
        orderFlag: 1
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data)
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },
})