// pages/box/box_search/box_search.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    box: {
      // boxId: '000036',
      // school: '广州中医药大学',
      // dormitory: 'K栋',
      // room: '404',
      // grade: '未知',
      // sex: '男',
      // attendDate: '20180903000000',
      // lastSuppleDate: '20181025202800',
      // lastPurchaseDate: '20181031202800',
      // goodsNum: '76',
      // sellNum: '30',
      // sellRatio: '0.48'
    },
    orders: [
      // {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }, {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }, {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }, {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }, {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }, {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }, {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }, {
      //   goodPic: '/image/box.png',
      //   goodName: '洽洽焦糖瓜子',
      //   orderDate: '20181031202800',
      //   goodPrice: '5.5',
      //   openid: 'askdfjkasdfljamsdfmcaoiwejf_asdjflad'
      // }
    ],
    showBox: false,
    date: [
      ['2018年', '2019年'],
      ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59'],
      ['15件', '16件', '17件', '18件', '19件', '20件', '21件', '22件', '23件', '24件', '25件', '26件', '27件', '28件', '29件', '30件', '31件', '32件', '33件', '34件', '35件', '36件', '37件', '38件', '39件', '40件', '41件', '42件', '43件', '44件', '45件', '46件', '47件', '48件', '49件', '50件', '51件', '52件', '53件', '54件', '55件', '56件', '57件', '58件', '59件', '60件', '61件', '62件', '63件', '64件', '65件', '66件', '67件', '68件', '69件', '70件', '71件', '72件', '73件', '74件', '75件', '76件', '77件', '78件', '79件', '80件', '81件', '82件', '83件', '84件', '85件', '86件', '87件', '88件', '89件', '90件', '91件', '92件', '93件', '94件', '95件', '96件', '97件', '98件', '99件', '100件', '101件', '102件', '103件', '104件', '105件', '106件', '107件', '108件', '109件', '110件', '111件', '112件', '113件', '114件', '115件', '116件', '117件', '118件', '119件', '120件']
    ],
    lastSuppleDateIndex: [0, 0, 0, 0, 0, 0, 0],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    var showBox = options.showBox;
    if (showBox == 'true') {
      var boxId = options.boxId;
      this.data.box.boxId = boxId;
      wx.startPullDownRefresh({});
    } else {}
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
    this.searchOneBox(this.data.box.boxId);
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




  delBox: function(e) {

    var self = this;
    var boxId = this.data.box.boxId;

    wx.showModal({
      title: '您确定要删除"' + boxId + '"吗',
      content: '该操作无法撤回',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          wx.showLoading({
            title: '',
          });
          wx.request({
            url: app.globalData.serverIp + 'DelBox.do',
            data: {
              boxId: boxId,
            },
            method: 'POST',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: function(res) {
              wx.hideLoading();
              self.setData({
                showBox: false
              })
              wx.showToast({
                title: '删除成功'
              })
            },
            fail: function(res) {
              console.log("faile");
            }
          })
          //调用删除接口
          //刷新cate
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })


  },
  searchBox: function(e) {
    var self = this;
    var value = e.detail.value;
    this.data.box.boxId = value;
    wx.startPullDownRefresh({});

  },

  searchOneBox: function(boxId) {
    var self = this;
    wx.showLoading({
      title: '',
    });
    wx.request({
      url: app.globalData.serverIp + 'GetOneBox.do',
      data: {
        boxId: boxId,
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        var box = res.data;
        if (box.boxId == null || box.boxId.length < 1) {
          wx.stopPullDownRefresh();
          wx.hideLoading();
          wx.showToast({
            title: '该盒子不存在',
            icon: 'none',
          })
        } else {
          box = self.processBox(box);
          self.setData({
            box: box,
            showBox: true
          })

          var now = self.date2String(new Date());
          self.getOneBoxOrders(box.boxId, box.lastSuppleDate, now)
        }


      },
      fail: function(res) {
        console.log("faile");
      }
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


  formatNumber: function(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  getOneBoxOrders: function(boxId, beginDate, endDate) {
    var self = this;
    wx.request({
      url: app.globalData.serverIp + 'GetBoxSnackOrderBetweenDate.do',
      data: {
        boxId: boxId,
        beginDate: beginDate,
        endDate: endDate
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        var orders = res.data.reverse();
        orders = self.processOrders(orders);
        console.log(res.data);
        self.setData({
          orders: res.data
        })
        wx.stopPullDownRefresh();
        wx.hideLoading();
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  processBox: function(box) {
    var self = this;
    var temp = box;
    temp.attendDateDay = self.getDayFromDate(temp.attendDate);
    temp.attendDateTime = self.getTimeFromDate(temp.attendDate);
    temp.lastSuppleDateDay = self.getDayFromDate(temp.lastSuppleDate);
    temp.lastSuppleDateTime = self.getTimeFromDate(temp.lastSuppleDate);
    temp.lastPurchaseDateDay = self.getDayFromDate(temp.lastPurchaseDate);
    temp.lastPurchaseDateTime = self.getTimeFromDate(temp.lastPurchaseDate);
    return temp;
  },

  processOrders: function(orders) {
    var self = this;
    var temp = orders;
    for (var i = 0; i < temp.length; i++) {
      temp[i].orderDateDay = self.getDayFromDate(temp[i].orderTime);
      temp[i].orderDateTime = self.getTimeFromDate(temp[i].orderTime).substr(0, 5);
      temp[i].openid = '**' + temp[i].openid.substr(temp[i].openid.length - 6);
    }
    return temp;
  },

  processTime: function(year, month, day, hour, minute, second) {
    var time = '' + year;
    if (month < 10) {
      time += ('0' + month);
    } else {
      time += month;
    }
    if (day < 10) {
      time += ('0' + day);
    } else {
      time += day;
    }
    if (hour < 10) {
      time += ('0' + hour);
    } else {
      time += hour;
    }
    if (minute < 10) {
      time += ('0' + minute);
    } else {
      time += minute;
    }
    if (second < 10) {
      time += ('0' + second);
    } else {
      time += second;
    }
    return time;
  },
  changeLastSuppleDate: function(e) {
    var self = this;
    var value = e.detail.value;
    var lastSuppleDate = this.processTime(value[0] + 2018, value[1] + 1, value[2] + 1, value[3], value[4], value[5]);
    var goodsNum = value[6] + 15;
    var box = this.data.box;
    box.lastSuppleDate = lastSuppleDate;
    box.goodsNum = goodsNum;
    console.log(lastSuppleDate);
    wx.showModal({
      title: '请确认补货信息',
      content: '时间:' + self.getDayFromDate(lastSuppleDate) + ' ' + self.getTimeFromDate(lastSuppleDate) + ';件数' + goodsNum,

      success: function(res) {

        if (res.confirm) {
          console.log('用户点击确定');
          self.updBox(self, box);
          //调用接口
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })


  },

  updBox: function(self, box) {
    wx.showLoading({
      title: '',
    });
    wx.request({
      url: app.globalData.serverIp + 'UpdBox.do',
      data: {
        boxId: box.boxId,
        school: box.school,
        dormitory: box.dormitory,
        room: box.room,
        grade: box.grade,
        sex: box.sex,
        attendDate: box.attendDate,
        lastSuppleDate: box.lastSuppleDate,
        lastPurchaseDate: box.lastPurchaseDate,
        goodsNum: box.goodsNum,
        sellNum: box.sellNum,
        sellRatio: box.sellRatio,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        wx.startPullDownRefresh({

        })
      },
      fail: function(res) {
        console.log("faile");
        console.log(res.data);
        wx.hideLoading();
      }
    })
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
  bindtapNavigate: function(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url
    });
  },
  setNewDate: function(e) {
    var date = new Date();
    var year = date.getFullYear(); //获取完整的年份(4位,1970-????)
    var month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
    var day = date.getDate(); //获取当前日(1-31)
    var hour = date.getHours(); //获取当前小时数(0-23)
    var minutes = date.getMinutes(); //获取当前分钟数(0-59)
    var seconds = date.getSeconds(); //获取当前秒数(0-59)
    this.data.lastSuppleDateIndex[0] = year - 2018;
    this.data.lastSuppleDateIndex[1] = month - 1;
    this.data.lastSuppleDateIndex[2] = day - 1;
    this.data.lastSuppleDateIndex[3] = hour;
    this.data.lastSuppleDateIndex[4] = minutes;
    this.data.lastSuppleDateIndex[5] = seconds;
    this.data.lastSuppleDateIndex[6] = 0;

    this.setData({
      lastSuppleDateIndex: this.data.lastSuppleDateIndex
    })

  }
})