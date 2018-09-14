// pages/good/good.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: '0',
    //排序按照优先字段来
    cate:[],

    good: [{
        categoryId: "C00000001",
        categoryName: '面包饼干',
        goodId: "G00000001",
        goodName: "好丽友派 2枚装",
        goodPic: '/image/snack/food.png',
        goodUnit: "盒",
        price: 3.5,
        isDisplay: true,
        priority: 1,
      },

      {
        categoryId: "C00000001",
        categoryName: '面包饼干',
        goodId: "G00000002",
        goodName: "千业乳酪夹心吐司",
        goodPic: '/image/snack/food.png',
        goodUnit: "包",
        price: 2,
        isDisplay: true,
        priority: 2,
      },

      {
        categoryId: "C00000001",
        categoryName: '面包饼干',
        goodId: "G00000003",
        goodName: "nabati饼干 奶酪味",
        goodPic: '/image/snack/food.png',
        goodUnit: "包",
        price: 2.5,
        isDisplay: true,
        priority: 3,
      },
      {
        categoryId: "C00000002",
        categoryName: '方便食品',
        goodId: "G00000005",
        goodName: "泰奇八宝粥",
        goodPic: '/image/snack/food.png',
        goodUnit: "罐",
        price: 4.5,
        isDisplay: true,
        priority: 4,
      }
    ]
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
    //这里应该调用接口更新cate（目录）
    this.getAllCate();
    
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

  cate_add: function(e) {
    wx.navigateTo({
      url: "/pages/commodity/cate_edit/cate_edit?isEdit=false",
    })
  },

  cate_edit: function(e) {
    let id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: "/pages/commodity/cate_edit/cate_edit?isEdit=true&id=" + id,
    })
  },

  cate_delete: function(e) {
    let id = e.currentTarget.dataset.id;
    var name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '您确定要删除"' + name + '"吗',
      content: '该操作将会删除其下所有商品且无法撤回，请谨慎操作',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          
          //调用删除接口
          //刷新cate
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },

  getAllCate:function(){
    var self = this;
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'getAllCategory.do',
      data: {
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        self.setData({
          cate:res.data
        })
        wx.hideLoading();
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  }
})