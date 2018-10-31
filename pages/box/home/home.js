// pages/box/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: '0',
    countData: {
      boxNum: 0,
      initialGoodQuantity: 0,
      sellGoodQuantity: 0,
      residualGoodQuantity: 0
    },
    boxs: [],
    boxs_boxId: [],
    boxs_sellRatio: [],
    boxs_lastPurchaseDate: [],
    getBoxsCount: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.startPullDownRefresh({})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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
    // wx.showLoading({
    //   title: '',
    // })
    this.getAllBoxs();
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

  bindtapNavigate: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  getAllBoxs: function() {
    this.data.getBoxsCount = 0;
    this.setBoxs('boxId', 1);
    this.setBoxs('sellRatio', 0);
    this.setBoxs('lastPurchaseDate', 1);
  },

  setBoxs: function(orderParam, orderFlag) {
    var self = this;
    wx.request({
      url: app.globalData.serverIp + 'SelBox.do',
      data: {
        orderParam: orderParam,
        orderFlag: orderFlag
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        //处理boxs的时间
        var temp = res.data;
        for (var i = 0; i < temp.length; i++) {
          temp[i].attendDateDay = self.getDayFromDate(temp[i].attendDate);
          temp[i].attendDateTime = self.getTimeFromDate(temp[i].attendDate);
          temp[i].lastSuppleDateDay = self.getDayFromDate(temp[i].lastSuppleDate);
          temp[i].lastSuppleDateTime = self.getTimeFromDate(temp[i].lastSuppleDate);
          temp[i].lastPurchaseDateDay = self.getDayFromDate(temp[i].lastPurchaseDate);
          temp[i].lastPurchaseDateTime = self.getTimeFromDate(temp[i].lastPurchaseDate);
        }
        console.log(orderParam + ':');
        console.log(temp);
        //判断应该将boxs赋值给谁
        if (orderParam == 'boxId') {
          self.data.boxs_boxId = temp;
        } else if (orderParam == 'sellRatio') {
          self.data.boxs_sellRatio = temp;
        } else if (orderParam =='lastPurchaseDate'){
          self.data.boxs_lastPurchaseDate = temp;
        }

        self.data.getBoxsCount++;





        //处理统计数据
        if (self.data.getBoxsCount == 1) {
          var box = temp;
          var countData = {};
          //盒子数量
          countData.boxNum = temp.length;
          countData.initialGoodQuantity = 0;
          countData.sellGoodQuantity = 0;
          for(var i = 0; i < temp.length; i++){
            countData.initialGoodQuantity += parseInt(temp[i].goodsNum);
            countData.sellGoodQuantity += parseInt(temp[i].sellNum);
          }
          countData.residualGoodQuantity = countData.initialGoodQuantity - countData.sellGoodQuantity;
          self.setData({
            countData:countData
          })
        }//选择并展示box
        else if (self.data.getBoxsCount == 3) {
          wx.stopPullDownRefresh();
          //盒子
          var boxs_temp;
          var index = self.data.navActive;
          if (index == '0') {
            boxs_temp = self.data.boxs_boxId;
          }
          //比例
          else if (index == '1') {
            boxs_temp = self.data.boxs_sellRatio;
          }
          //时间
          else if (index == '2') {
            boxs_temp = self.data.boxs_lastPurchaseDate;
          };
          self.setData({
            boxs: boxs_temp
          });
        }
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  chooseTitle: function(e) {
    var self = this;
    let index = e.currentTarget.dataset.index;
    var boxs_temp = [];
    console.log(index);
    //反转
    if (index == this.data.navActive) {
      boxs_temp = this.data.boxs;
      boxs_temp = boxs_temp.reverse();
    }
    //盒子
    else if (index == '0') {
      boxs_temp = this.data.boxs_boxId;
    }
    //比例
    else if (index == '1') {
      boxs_temp = this.data.boxs_sellRatio;
    }
    //时间
    else if (index == '2') {
      boxs_temp = this.data.boxs_lastPurchaseDate;
      console.log('在这')
    }
    console.log(boxs_temp)
    this.setData({
      navActive: index,
      boxs: boxs_temp
    });
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
  },

  // bindtapNavigateToBoxSearch: function(e) {
  //   let index = e.currentTarget.dataset.index;
  //   console.log(index);
  //   wx.navigateTo({
  //     url: "/pages/box/box_search/box_search?showBox=true&boxItem=" + JSON.stringify(this.data.boxs[index]),
  //   })
  // }
})