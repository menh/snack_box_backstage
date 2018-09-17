// pages/good/good_add/good_add.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

 
  data: {
    cate: {
      categoryName: "",
      reorder: 1,
      valid: "0"
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;

    var isEdit = options.isEdit;
    console.log(isEdit);
    //编辑
    if (isEdit == 'true') {
      wx.setNavigationBarTitle({
        title: '编辑目录'
      });
      console.log(JSON.parse(options.cateItem))
      self.setData({
        cate: JSON.parse(options.cateItem)
      })
    } //添加
    else {
      wx.setNavigationBarTitle({
        title: '添加目录'
      });

    }
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

  bindCategoryNameInput: function(e) {
    var categoryName = e.detail.value
    this.data.cate.categoryName = categoryName;
  },

  bindReorderInput: function(e) {
    var reorder = parseInt(e.detail.value)
    this.data.cate.reorder = reorder;
  },

  bindDisplayChange: function(e) {
    var temp = e.detail.value;
    this.data.cate.valid = temp;
  },

  submit_cate_edit: function(e) {
    console.log(this.data.cate);
    const self = this;
    //res带着id，代表其为修改目录，若没有带着id，代表其为增加目录
    if (this.data.cate.categoryName != "" && this.data.cate.reorder > 0) {
      wx.showModal({
        title: '请确认信息',
        content: JSON.stringify(this.data.cate),

        success: function(res) {

          if (res.confirm) {
            console.log('用户点击确定');
            self.updCategory(self,self.data.cate);
            //调用接口
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    } else {
      wx.showModal({
        content: '请填写全部目录信息',
        showCancel:false
      })
    }
  },
  updCategory: function(self,cate) {
    // var self = this;
    console.log("daozhele")
    console.log(cate.categoryId);
    if (cate.categoryId == undefined){
      cate.categoryId = '';
    }
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'updCategory.do',
      data: {
        categoryId: cate.categoryId,
        categoryName: cate.categoryName,
        reorder: cate.reorder,
        valid: cate.valid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        wx.hideLoading();
        wx.navigateBack({
          
        })
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  }
})