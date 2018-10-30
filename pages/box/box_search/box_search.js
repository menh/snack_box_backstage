// pages/box/box_search/box_search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    box: {
      boxId: '000036',
      school: '广州中医药大学',
      dormitory: 'K栋',
      room: '404',
      grade: '未知',
      sex: '男',
      attendDate: '20180903000000',
      lastSuppleDate: '20181025202800',
      lastPurchaseDate: '20181031202800',
      goodsNum: '76',
      sellNum: '30',
      sellRatio: '0.48'
    },
    orders: [{
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }, {
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }, {
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }, {
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }, {
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }, {
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }, {
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }, {
      goodPic: '/image/box.png',
      goodName: '洽洽焦糖瓜子',
      orderDate: '20181031202800',
      goodPrice: '5.5',
      openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
    }]
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

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var self = this;
    var temp = this.data.box;
    temp.attendDateDay = self.getDayFromDate(temp.attendDate);
    temp.attendDateTime = self.getTimeFromDate(temp.attendDate);
    temp.lastSuppleDateDay = self.getDayFromDate(temp.lastSuppleDate);
    temp.lastSuppleDateTime = self.getTimeFromDate(temp.lastSuppleDate);
    temp.lastPurchaseDateDay = self.getDayFromDate(temp.lastPurchaseDate);
    temp.lastPurchaseDateTime = self.getTimeFromDate(temp.lastPurchaseDate);
    self.setData({
      box: temp
    })



    temp = this.data.orders;
    for (var i = 0; i < temp.length; i++) {
      temp[i].orderDateDay = self.getDayFromDate(temp[i].orderDate);
      temp[i].orderDateTime = self.getTimeFromDate(temp[i].orderDate).substr(0, 5);
      temp[i].openid = '**' + temp[i].openid.substr(temp[i].openid.length - 6);
    }
    self.setData({
      orders: temp
    })
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

  getDayFromDate: function(date) {
    var day = '';
    if (date.length < 8) {
      return day;
    }
    day += date.substr(4, 2);
    day += '月';
    day += date.substr(6, 2);
    day += '日'
    return day;
  },
  getTimeFromDate: function(date) {
    var time = '';
    if (date.length < 14) {
      return time;
    }
    time += date.substr(8, 2);
    time += ':'
    time += date.substr(10, 2);
    time += ':'
    time += date.substr(12, 2);
    return time;
  }
})