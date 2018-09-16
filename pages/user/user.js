// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: '0',
    share: [
      {
        shareId: 'S00000001',
        shareName: '门虎',
        sharePhone: '13582342871',
        beSharedName: '大哥',
        beSharedPhone: '15013149789',
        status: '0'
      },
      {
        shareId: 'S00000001',
        shareName: '门虎',
        sharePhone: '13582342871',
        beSharedName: '大哥',
        beSharedPhone: '15013149789',
        status: '0'
      },
      {
        shareId: 'S00000001',
        shareName: '门虎',
        sharePhone: '13582342871',
        beSharedName: '大哥',
        beSharedPhone: '15013149789',
        status: '0'
      },
      {
        shareId: 'S00000001',
        shareName: '门虎',
        sharePhone: '13582342871',
        beSharedName: '大哥',
        beSharedPhone: '15013149789',
        status: '0'
      },
      {
        shareId: 'S00000001',
        shareName: '门虎',
        sharePhone: '13582342871',
        beSharedName: '大哥',
        beSharedPhone: '15013149789',
        status: '0'
      }
    ]
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