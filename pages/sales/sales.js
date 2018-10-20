// pages/box/box.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    navActive: '0',
    data: {},
    countData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.getSnackOrderSaleNum('2018/09/03','2018/09/06');
    //this.getSnackOrderGoodCount('2018/09/03', '2018/09/05');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

    var beginDate = this.getBeginDate(0);
    var endDate = this.getEndDate(0);


    this.getSnackOrderSaleNum(beginDate, endDate);
    this.getSnackOrderGoodCount(beginDate, endDate);

    // this.test();

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  chooseTime: function(e) {
    let index = e.currentTarget.dataset.index;
    console.log(index);
    this.flag = true;
    this.setData({
      navActive: index
    });


    var beginDate = this.getBeginDate(index);
    var endDate = this.getEndDate(index);


    this.getSnackOrderSaleNum(beginDate, endDate);
    this.getSnackOrderGoodCount(beginDate, endDate);
  },

  test: function() {
    wx.request({
      url: app.globalData.serverIp + 'SendMessage.do',
      data: {
        phoneNumber: "15013149789",
        templateId: '209126'
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log("发短信")
        console.log(res.data)
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  },
  getBeginDate: function(index) {


    //获取截止时间
    var temp = new Date();
    var date = new Date(temp);

    if (index == '0') { //今日
      date.setDate(temp.getDate());
    } else if (index == '1') { //三日
      date.setDate(temp.getDate() - 3);
    } else if (index == '2') { //七日
      date.setDate(temp.getDate() - 7);
    } else if (index == '3') { //一月
      date.setDate(temp.getDate() - 30);
    } else if (index == '4') { //昨日
      date.setDate(temp.getDate() - 1);
    } else { //一年
      date.setDate(temp.getDate() - 365);
    }
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var beginDate = [year, month, day].map(this.formatNumber).join('');
    console.log('beginDate:' + beginDate);
    return beginDate;
  },


  getEndDate: function(index) {


    //获取截止时间
    var temp = new Date();
    var date = new Date(temp);

    if (index == '0') { //今日
      date.setDate(temp.getDate() + 1);
    } else if (index == '1') { //三日
      date.setDate(temp.getDate());
    } else if (index == '2') { //七日
      date.setDate(temp.getDate());
    } else if (index == '3') { //一月
      date.setDate(temp.getDate());
    } else if (index == '4') { //昨日
      date.setDate(temp.getDate());
    } else { //总共
      date.setDate(temp.getDate() + 1);
    }

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var endDate = [year, month, day].map(this.formatNumber).join('');
    console.log('endDate:' + endDate);
    return endDate;
  },


  getSnackOrderSaleNum: function(beginDate, endDate) {
    const self = this;
    console.log(app.globalData.serverIp + 'getSnackOrderSaleNum.do');
    console.log(beginDate);
    this.setData({
      data: {},
    });

    wx.showToast({
      title: '',
      icon: "loading",
      duration: 50000
    })

    // console.log(beginDate + ';' + endDate);
    wx.request({
      url: app.globalData.serverIp + 'getSnackOrderSaleNum.do',
      data: {
        beginDate: beginDate,
        endDate: endDate,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        self.setData({
          data: res.data
        })
        // wx.stopPullDownRefresh();
        wx.hideToast();
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },


  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  getSnackOrderGoodCount: function(beginDate, endDate) {
    const self = this;

    this.setData({
      countData: {},
    });

    wx.showToast({
      title: '',
      icon: "loading",
      duration: 5000
    })

    wx.request({
      url: app.globalData.serverIp + 'getSnackOrderGoodCount.do',
      data: {
        beginDate: beginDate,
        endDate: endDate,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        self.setData({
          countData: res.data
        })
        console.log(res.data);
        console.log('count:' + res.data);
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  }

})