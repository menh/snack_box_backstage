// pages/openBox/openBox.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    openid:''
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
  onShow: function () {
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

  getId_tap: function () {
    // 设置input里面的编号
    var self = this;
    this.setData({
      openid: app.globalData.openid
    })
    
    wx.setClipboardData({
      data: app.globalData.openid,
      success: function (res) {
        wx.showToast({
          title: '已复制到剪切板',
        })
      },
    })

  }



})