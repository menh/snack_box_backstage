// pages/good/good_add/good_add.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  res: {
    name: "",
    priority: -1,
    display: false,
  },


  data: {
    cate: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    var temp;
    var id = options.id;
    var isEdit = options.isEdit;
    console.log(isEdit);
    //编辑
    if (isEdit == 'true') {
      wx.setNavigationBarTitle({
        title: '编辑目录'
      });
      //调用接口获取该id的目录并赋值
      temp = {
        id: 'C00000001',
        name: '面包饼干',
        priority: 1,
        display: true
      };
      self.setData({
        cate: temp
      })
    } //添加
    else {
      wx.setNavigationBarTitle({
        title: '添加目录'
      });
      temp = {
        display: false
      };
      self.setData({
        cate: temp
      })
    }

    this.res = temp;
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

  bindNameInput: function(e) {
    var name = e.detail.value
    this.res.name = name;
  },

  bindPriorityInput: function(e) {
    var priority = parseInt(e.detail.value)
    this.res.priority = priority;
  },

  bindDisplayChange: function(e) {
    var temp = e.detail.value;
    if (temp == "true") {
      this.res.display = true;
    } else {
      this.res.display = false;
    }
  },

  submit_cate_edit: function(e) {
    console.log(this.res);
    const self = this;
    //加入改变目录数据的接口
    //res带着id，代表其为修改目录，若没有带着id，代表其为增加目录
    if (this.res.name != undefined && this.res.name != "" && this.res.priority != undefined && this.res.priority >= 0) {
      var categoryId = this.res.id;
      var categoryName = this.res.name;
      var reorder = this.res.priority;
      var valid = this.res.valid;
      wx.showModal({
        title: '请确认信息',
        content: JSON.stringify(this.res),

        success: function(res) {
          
          if (res.confirm) {
            console.log('用户点击确定');
            self.updCategory(categoryId, categoryName, reorder, valid);
            wx.navigateBack({
              delta: 1
            })
            //调用接口
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    } else {
      wx.showToast({
        title: '请填写全部目录信息',
        icon: 'none'
      })
    }
  },
  updCategory: function (categoryId, categoryName, reorder, valid) {
    var self = this;
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'updCategory.do',
      data: {
        categoryId: categoryId,
        categoryName: categoryName,
        reorder: reorder,
        valid: valid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  }
})