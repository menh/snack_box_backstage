// pages/good/good.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: '0',
    cate: [{
      id: 1,
      name: '面包饼干',
      sum: 4,
      priority: 1,
      display: true
    }, {
      id: 2,
      name: '方便食品',
      sum: 4,
      priority: 2,
      display: true
    }, {
      id: 3,
      name: '休闲零食',
      sum: 12,
      priority: 3,
      display: true
    }, {
      id: 4,
      name: '奶品饮料',
      sum: 4,
      priority: 4,
      display: true
    }],

    good: [{
      id: 1,
      cateId: 1,
      name: '好丽友派 2枚装',
       img: '../../image/snack/food.png',
      price: 4,
      unit: 1,
      priority: 4,
      display: true
    }, {
      id: 2,
      name: '方便食品',
      sum: 4,
      priority: 2,
      display: true
    }, {
      id: 3,
      name: '休闲零食',
      sum: 12,
      priority: 3,
      display: true
    }, {
      id: 4,
      name: '奶品饮料',
      sum: 4,
      priority: 4,
      display: true
    }, ],
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

  chooseCate: function(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.flag = true;
    this.setData({
      navActive: index
    });
    // this.getSnackOrderSaleNum(index);
    // this.getSnackOrderGoodCount(index);
  },

  navigator_cate_add: function(e) {
    wx.navigateTo({
      url: "/pages/good/cate_add/cate_add",
    })
  }
})