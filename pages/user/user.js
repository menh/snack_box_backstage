// pages/user/user.js
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: '0',
    share:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAllShare();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  getAllShare: function () {
var self = this;
    wx.showLoading({
      title: '请稍等',
    })
    wx.request({
      url: app.globalData.serverIp + 'GetCustomerFriend.do',
      data: {
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          share:res.data
        })
        console.log("true");
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        console.log("faile");
      }
    })

  },
  callPhone:function(e){
    var phone = e.currentTarget.dataset.phone;
    console.log(e.currentTarget.dataset.phone);
    wx.setClipboardData({
      data: phone,
    });
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  }
})