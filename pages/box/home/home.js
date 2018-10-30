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
    boxs: []
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
    var self = this;
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      navActive: index
    });

    wx.request({
      url: app.globalData.serverIp + 'SelBox.do',
      data: {
        orderParam: "boxId",
        orderFlag: 0
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data)
        var temp = res.data;
        for(var i = 0; i < temp.length; i++){
          temp[i].attendDateDay = self.getDayFromDate(temp[i].attendDate);
          temp[i].attendDateTime = self.getTimeFromDate(temp[i].attendDate);
          temp[i].lastSuppleDateDay = self.getDayFromDate(temp[i].lastSuppleDate);
          temp[i].lastSuppleDateTime = self.getTimeFromDate(temp[i].lastSuppleDate);
          temp[i].lastPurchaseDateDay = self.getDayFromDate(temp[i].lastPurchaseDate);
          temp[i].lastPurchaseDateTime = self.getTimeFromDate(temp[i].lastPurchaseDate);
        }

        self.setData({
          boxs:temp
        })
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },


  getDayFromDate: function (date) {
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
  getTimeFromDate: function (date) {
    var time = '';
    if (date.length < 14){
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