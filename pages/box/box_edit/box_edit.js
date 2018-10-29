// pages/box/box_edit/box_edit.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    box: {
      boxId: '000036',
      school: '',
      dormitory: 'K栋',
      room: '404',
      grade: '',
      sex: '男',
      attendDate: '',
      lastSuppleDate: '',
      lastPurchaseDate: '',
      goodsNum: '76',
      sellNum:'',
      sellRatio:''
    },
    school: ['广州中医药大学', '广东药科大学'],
    grade: ['未知', '大一', '大二', '大三', '大四', '研一', '研二', '研三'],
    date: [
      ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
      ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20','21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    ],
    schoolIndex: 0,
    gradeIndex: 0,
    attendDateIndex: [8, 2, 0, 0],
    lastSuppleDateIndex: [9, 24, 20, 28],
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

  bindInput: function(e) {
    var value = e.detail.value;
    var name = e.currentTarget.dataset.name;
    if (name == 'boxId') {
      this.data.box.boxId = value;
    } else if (name == 'dormitory') {
      this.data.box.dormitory = value;
    } else if (name == 'room') {
      this.data.box.room = value;
    } else if (name == 'goodsNum') {
      this.data.box.goodsNum = value;
    }
  },
  bindPickerChange: function(e) {
    var value = e.detail.value;
    var name = e.currentTarget.dataset.name;
    if (name == 'school') {
      this.setData({
        schoolIndex: value
      });
    } else if (name == 'grade') {
      this.setData({
        gradeIndex: value
      });
    } else if (name == 'attendDate') {

      this.setData({
        attendDateIndex: value
      });
    } else if (name == 'lastSuppleDate') {

      this.setData({
        lastSuppleDateIndex: value
      });
    }
  },

  bindRadioChange: function (e) {
    var value = e.detail.value;
    var name = e.currentTarget.dataset.name;
    if (name == 'sex') {
      this.data.box.sex = value;
    }
  },
  processTime:function(year,month,day,hour,minute,second){
    var time = '' + year;
    if (month < 10) {
      time += ('0' + month);
    }else{
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

  submit: function(e) {
    var box = this.data.box;
    var attendDate = '';
    var lastSuppleDate= '';
    console.log(box);
    const self = this;
    box.school = this.data.school[this.data.schoolIndex];
    box.grade = this.data.grade[this.data.gradeIndex];
    box.attendDate = this.processTime(2018, this.data.attendDateIndex[0] + 1, this.data.attendDateIndex[1] + 1, this.data.attendDateIndex[2], this.data.attendDateIndex[3],0);
    box.lastSuppleDate = this.processTime(2018, this.data.lastSuppleDateIndex[0] + 1, this.data.lastSuppleDateIndex[1] + 1, this.data.lastSuppleDateIndex[2], this.data.lastSuppleDateIndex[3], 0);

    if (true) {
      wx.showModal({
        title: '请确认信息',
        content: JSON.stringify(this.data.box),

        success: function(res) {

          if (res.confirm) {
            console.log('用户点击确定');
            self.addBox(self.data.box);
            //调用接口
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    } else {
      wx.showModal({
        content: '请填写全部目录信息',
        showCancel: false
      })
    }
  },





  addBox: function (box) {
    console.log(box);
    if (box.lastPurchaseDate == undefined) {
     box.lastPurchaseDate = '';
    }
    if (box.sellNum == undefined) {
      box.sellNum = 0;
    }
    if (box.sellRatio == undefined) {
      box.sellRatio = 0;
    } 
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'AddBox.do',
      data: {
        boxId: box.boxId,
        school:box.school,
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
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        wx.navigateBack({
        })
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  },

})