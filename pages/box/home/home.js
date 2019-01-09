// pages/box/home/home.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: 0,
    countData: {
      boxNum: 0,
      initialGoodQuantity: 0,
      sellGoodQuantity: 0,
      residualGoodQuantity: 0
    },
    boxs: [],
    boxsIndex: 0,
    boxsSort: 0,

    boxs_supplement: [],
    boxs_silent: [],
    // boxs_boxId: [],
    // boxs_sellRatio: [],
    // boxs_lastPurchaseDate: [],
    // getBoxsCount: 0,
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


    // this.data.getBoxsCount = 0;
    // this.setBoxs('boxId', 1);
    // this.setBoxs('sellRatio', 0);
    // this.setBoxs('lastPurchaseDate', 1);


    var self = this;
    wx.request({
      url: app.globalData.serverIp + 'SelBox.do',
      data: {
        orderParam: 'boxId',
        orderFlag: 1,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        //处理boxs的时间和剩余商品
        var temp = res.data;

        // //处理统计数据
        var box = temp;
        var countData = {};
        //盒子数量
        countData.boxNum = temp.length;
        countData.initialGoodQuantity = 0;
        countData.sellGoodQuantity = 0;
        for (var i = 0; i < temp.length; i++) {
          countData.initialGoodQuantity += parseInt(temp[i].goodsNum);
          countData.sellGoodQuantity += parseInt(temp[i].sellNum);
        }
        countData.residualGoodQuantity = countData.initialGoodQuantity - countData.sellGoodQuantity;
        self.setData({
          countData: countData
        })


        for (var i = 0; i < temp.length; i++) {
          temp[i].attendDateDay = self.getDayFromDate(temp[i].attendDate);
          temp[i].attendDateTime = self.getTimeFromDate(temp[i].attendDate);
          temp[i].lastSuppleDateDay = self.getDayFromDate(temp[i].lastSuppleDate);
          temp[i].lastSuppleDateTime = self.getTimeFromDate(temp[i].lastSuppleDate);
          temp[i].lastPurchaseDateDay = self.getDayFromDate(temp[i].lastPurchaseDate);
          temp[i].lastPurchaseDateTime = self.getTimeFromDate(temp[i].lastPurchaseDate);

          temp[i].residualNum = temp[i].goodsNum - temp[i].sellNum;
        }

        self.getBoxsSupplementAndSilent(self, temp);

        //获取各个box
        //boxId
        var boxId = temp;
        self.setData({
          ['boxs[0][0]']: boxId,
        })
        self.setData({
          ['boxs[0][1]']: boxId.reverse()
        })
        //boxRadio
        var boxRadio = temp;
        var compare = function(order1, order2) { //比较函数
          if (parseFloat(order1.sellRatio) < parseFloat(order2.sellRatio)) {
            return -1;
          } else if (parseFloat(order1.sellRatio) > parseFloat(order2.sellRatio)) {
            return 1;
          } else {
            return 0;
          }
        }
        boxRadio.sort(compare);
        self.setData({
          ['boxs[1][0]']: boxRadio,
        })
        self.setData({
          ['boxs[1][1]']: boxRadio.reverse()
        })

        //boxLastPurchaseDate
        var boxLastPurchaseDate = temp;
        var compare = function(order1, order2) { //比较函数
          if (order2.lastPurchaseDate == '' || parseInt(order1.lastPurchaseDate) > parseInt(order2.lastPurchaseDate)) {
            return -1;
          } else if (order1.lastPurchaseDate == '' || parseInt(order1.lastPurchaseDate) < parseInt(order2.lastPurchaseDate)) {
            return 1;
          } else {
            return 0;
          }
        }
        boxLastPurchaseDate.sort(compare);
        self.setData({
          ['boxs[2][0]']: boxLastPurchaseDate,
        })
        self.setData({
          ['boxs[2][1]']: boxLastPurchaseDate.reverse()
        })

        //boxResidualNum
        var boxResidualNum = temp;
        var compare = function(order1, order2) { //比较函数
          if (order1.residualNum > order2.residualNum) {
            return -1;
          } else if (order1.residualNum < order2.residualNum) {
            return 1;
          } else {
            return 0;
          }
        }
        boxResidualNum.sort(compare);
        self.setData({
          ['boxs[3][0]']: boxResidualNum,
        })
        self.setData({
          ['boxs[3][1]']: boxResidualNum.reverse()
        })

        console.log(boxId)
        wx.stopPullDownRefresh();
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  // setBoxs: function(orderParam, orderFlag) {
  //   var self = this;
  //   wx.request({
  //     url: app.globalData.serverIp + 'SelBox.do',
  //     data: {
  //       orderParam: orderParam,
  //       orderFlag: orderFlag
  //     },
  //     method: 'POST',
  //     header: {
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     },
  //     success: function(res) {
  //       //处理boxs的时间
  //       var temp = res.data;
  //       for (var i = 0; i < temp.length; i++) {
  //         temp[i].attendDateDay = self.getDayFromDate(temp[i].attendDate);
  //         temp[i].attendDateTime = self.getTimeFromDate(temp[i].attendDate);
  //         temp[i].lastSuppleDateDay = self.getDayFromDate(temp[i].lastSuppleDate);
  //         temp[i].lastSuppleDateTime = self.getTimeFromDate(temp[i].lastSuppleDate);
  //         temp[i].lastPurchaseDateDay = self.getDayFromDate(temp[i].lastPurchaseDate);
  //         temp[i].lastPurchaseDateTime = self.getTimeFromDate(temp[i].lastPurchaseDate);
  //       }
  //       console.log(orderParam + ':');
  //       console.log(temp);
  //       //判断应该将boxs赋值给谁
  //       if (orderParam == 'boxId') {
  //         self.data.boxs_boxId = temp;
  //       } else if (orderParam == 'sellRatio') {
  //         self.data.boxs_sellRatio = temp;
  //       } else if (orderParam == 'lastPurchaseDate') {
  //         self.data.boxs_lastPurchaseDate = temp;
  //       }

  //       self.data.getBoxsCount++;

  //       //处理统计数据
  //       if (self.data.getBoxsCount == 1) {
  //         var box = temp;
  //         var countData = {};
  //         //盒子数量
  //         countData.boxNum = temp.length;
  //         countData.initialGoodQuantity = 0;
  //         countData.sellGoodQuantity = 0;
  //         for (var i = 0; i < temp.length; i++) {
  //           countData.initialGoodQuantity += parseInt(temp[i].goodsNum);
  //           countData.sellGoodQuantity += parseInt(temp[i].sellNum);
  //         }
  //         countData.residualGoodQuantity = countData.initialGoodQuantity - countData.sellGoodQuantity;
  //         self.setData({
  //           countData: countData
  //         })
  //       } //选择并展示box
  //       else if (self.data.getBoxsCount == 3) {
  //         wx.stopPullDownRefresh();
  //         //盒子
  //         var boxs_temp;
  //         var index = self.data.navActive;
  //         if (index == '0') {
  //           boxs_temp = self.data.boxs_boxId;
  //         }
  //         //比例
  //         else if (index == '1') {
  //           boxs_temp = self.data.boxs_sellRatio;
  //         }
  //         //时间
  //         else if (index == '2') {
  //           boxs_temp = self.data.boxs_lastPurchaseDate;
  //         };
  //         self.setData({
  //           boxs: boxs_temp
  //         });
  //       }
  //     },
  //     fail: function(res) {
  //       console.log("faile");
  //     }
  //   })
  // },

  chooseTitle: function(e) {
    var self = this;
    let index = parseInt(e.currentTarget.dataset.index);
    this.setData({
      navActive: index
    });
  },

  sortBox: function(e) {
    var self = this;
    var index = parseInt(e.currentTarget.dataset.index);
    var sort = this.data.boxsSort === 0 ? 1 : 0;
    console.log(index)
    console.log(sort)
    this.setData({
      boxsIndex: index,
      boxsSort: sort
    });
    console.log(this.data.boxs[index])
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
  getBoxsSupplementAndSilent: function(self, boxs) {
    var boxs_supplement = [];
    var boxs_silent = [];
    for (var i = 0; i < boxs.length; i++) {
      var box = boxs[i];
      var radio = parseFloat(box.sellRatio);
      var lastPurchaseDate = parseInt(box.lastPurchaseDate); //最后消费时间
      var labelDate2 = parseInt(self.date2String(new Date(new Date() - 2 * 24 * 60 * 60 * 1000))); //两天前
      var labelDate5 = parseInt(self.date2String(new Date(new Date() - 5 * 24 * 60 * 60 * 1000))); //五天前
      var labelDate10 = parseInt(self.date2String(new Date(new Date() - 10 * 24 * 60 * 60 * 1000))); //十天前
      var labelDate15 = parseInt(self.date2String(new Date(new Date() - 15 * 24 * 60 * 60 * 1000))); //十五天前


      //通过件数画线，当剩余数量低于5件立即补，低于10件且超过2天没有消费立即补
      if (box.residualNum <= 6) {
        boxs_supplement.push(box);
        continue;
      } else if (box.residualNum <= 10 && labelDate2 > lastPurchaseDate) {//超过两天没有消费
        boxs_supplement.push(box);
        continue;
      } else if (lastPurchaseDate >= labelDate5 && radio >= 0.8) {//通过时间画线，5日:0.8以上;10日:0.7以上;15日:0.6以上
        boxs_supplement.push(box);
        continue;
      } else if (lastPurchaseDate < labelDate5 && lastPurchaseDate >= labelDate10 && radio >= 0.7) {
        boxs_supplement.push(box);
        continue;
      } else if (lastPurchaseDate < labelDate10 && lastPurchaseDate >= labelDate15 && radio >= 0.6) {
        boxs_supplement.push(box);
        continue;
      } else if (lastPurchaseDate < labelDate15){
        boxs_silent.push(box);
        continue;
      }

    }


    var compare = function (order1, order2) { //比较函数
      if (parseFloat(order1.sellRatio) < parseFloat(order2.sellRatio)) {
        return 1;
      } else if (parseFloat(order1.sellRatio) > parseFloat(order2.sellRatio)) {
        return -1;
      } else {
        return 0;
      }
    }
    boxs_supplement.sort(compare);

    self.setData({
      boxs_supplement: boxs_supplement,
      boxs_silent: boxs_silent
    })

  },

  date2String: function(date) {
    var year = this.formatNumber(date.getFullYear()); //获取完整的年份(4位,1970-????)
    var month = this.formatNumber(date.getMonth() + 1); //获取当前月份(0-11,0代表1月)
    var day = this.formatNumber(date.getDate()); //获取当前日(1-31)
    var hour = this.formatNumber(date.getHours()); //获取当前小时数(0-23)
    var minutes = this.formatNumber(date.getMinutes()); //获取当前分钟数(0-59)
    var seconds = this.formatNumber(date.getSeconds()); //获取当前秒数(0-59)
    return year + month + day + hour + minutes + seconds;
  },
  string2Date: function(date) {
    var year = parseInt(date.substr(0, 4));
    var month = parseInt(date.substr(4, 2)) - 1;
    var day = parseInt(date.substr(6, 2));
    var hour = parseInt(date.substr(8, 2));
    var minutes = parseInt(date.substr(10, 2));
    var seconds = parseInt(date.substr(12, 2));

    return new Date(year, month, day, hour, minutes, seconds);
  },


  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  // bindtapNavigateToBoxSearch: function(e) {
  //   let index = e.currentTarget.dataset.index;
  //   console.log(index);
  //   wx.navigateTo({
  //     url: "/pages/box/box_search/box_search?showBox=true&boxItem=" + JSON.stringify(this.data.boxs[index]),
  //   })
  // }
})