// pages/box/box_structure/box_structure.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    toView: 'category_0',
    isEdit: false,
    getInterfaceName: '',
    setInterfaceName: '',
    boxId: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var getInterfaceName = options.getInterfaceName;
    var setInterfaceName = options.setInterfaceName;
    var boxId = options.boxId;
    console.log('getInterfaceName:', getInterfaceName);
    console.log('setInterfaceName:', setInterfaceName);
    console.log('boxId:', boxId);
    this.setData({
      getInterfaceName: getInterfaceName,
      setInterfaceName: setInterfaceName,
      boxId: boxId
    })
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
    wx.startPullDownRefresh({});
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
    this.getGoodList();
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
  getGoodList: function() {
    const self = this;

    wx.request({
      url: app.globalData.serverIp + 'getGoodList.do',
      data: {

      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        self.getGoodListCallback(self, res.data);
        // wx.stopPullDownRefresh();
      },
      fail: function(res) {
        wx.showToast({
          title: '连接失败',
          icon: 'none'
        })
      }
    })
  },

  getGoodListCallback: function(self, category) {
    wx.setStorageSync('snack', category); //保存初始snack到缓存
    app.globalData.category = category;
    category = self.priceAdjustment(category); //价格*100
    self.getStructure(self, category, self.data.boxId, self.data.getInterfaceName);
  },

  getStructure: function(self, category, boxId, interfaceName) {
    // console.log(app.globalData.serverIp + interfaceName + '.do')
    wx.request({
      url: app.globalData.serverIp + interfaceName + '.do',
      data: {
        boxId: boxId
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        // console.log(res.data);
        var structs = res.data;
        // var structs = [{
        //   goodId: "G00000001",
        //   goodNum: '1'
        // }, {
        //   goodId: "G00000002",
        //   goodNum: '3'
        // }, {
        //   goodId: "G00000021",
        //   goodNum: '2'
        // }, ];
        self.processCommodityData(self, category, structs); //处理商品结构数量
        // wx.stopPullDownRefresh();
      },
      fail: function(res) {
        wx.showToast({
          title: '连接失败',
          icon: 'none'
        })
      }
    })


  },


  processCommodityData: function(self, category, structs) {
    var structsMap = new Map();
    for(var i = 0; i < structs.length; i++){
      structsMap.set(structs[i].goodId,structs[i]);
    }

    for (var i = 0; i < category.length; i++) {
      var item = category[i].categoryItem;
      for (var j = 0; j < item.length; j++) {
        if(structsMap.has(item[j].goodId)){
          item[j].commodityNum = parseInt(structsMap.get(item[j].goodId).goodNum);
        }
        
      }
    }
    self.setShowByCategory(category)

    console.log(category);
    console.log(structs);

    self.setData({
      category: category
    })
    wx.stopPullDownRefresh();
  },


  priceAdjustment: function(category) {
    var tempCategory = category;
    for (var i = 0; i < tempCategory.length; i++) {
      var item = tempCategory[i].categoryItem;
      for (var j = 0; j < item.length; j++) {
        item[j].price *= 100;
      }
    }
    return tempCategory;
  },


  chooseType: function(e) {
    let id = e.currentTarget.dataset.id;
    this.setData({
      toView: id,
    })
  },

  changeToEdit: function(e) {
    this.setData({
      isEdit: true
    })
  },
  saveCommodityStructure: function(e) {
    var self = this;
    wx.showModal({
      title: '商品结构',
      content: '是否保存',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          self.setStructure(self, self.data.boxId, self.data.category, self.data.setInterfaceName);
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })



  },

  setStructure: function(self, boxId, category, interfaceName) {
    var goodStructDetail = self.getStructsByCategory(category);
    var boxId = self.data.boxId;
    console.log("goodStructDetail:",goodStructDetail)
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.serverIp + interfaceName + '.do',
      data: {
        boxId: boxId,
        goodStructDetail: goodStructDetail
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        wx.hideLoading();
        self.setData({
          isEdit: false,
          category:[]
        });
        wx.startPullDownRefresh({})
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '连接失败',
          icon: 'none'
        })
      }
    })
  },


  subtractGood: function(e) {
    var goodId = e.target.dataset.id;
    var goodItem = this.getGoodById(this.data.category, goodId);
    if (goodItem.commodityNum > 0) {
      goodItem.commodityNum--;
    }
    this.setShowByCategory(this.data.category);
    this.setData({
      category: this.data.category,
    })
  },

  addGood: function(e) {
    // console.log('hello')
    var goodId = e.target.dataset.id;
    var goodItem = this.getGoodById(this.data.category, goodId);
    // console.log(goodItem)
    goodItem.commodityNum = goodItem.commodityNum ? goodItem.commodityNum + 1 : 1;
    this.setShowByCategory(this.data.category);
    this.setData({
      category: this.data.category,
    })
  },

  getGoodById: function(category, goodId) {
    var tempCategory = category;
    for (var i = 0; i < tempCategory.length; i++) {
      var item = tempCategory[i].categoryItem;
      for (var j = 0; j < item.length; j++) {
        if (item[j].goodId == goodId) {
          return item[j];
        }
      }
    }
    return '';
  },
  setShowByCategory: function(category) {
    var tempCategory = category;
    for (var i = 0; i < tempCategory.length; i++) {
      var isShow = false;
      var item = tempCategory[i].categoryItem;
      for (var j = 0; j < item.length; j++) {
        if (item[j].commodityNum > 0) {
          item[j].isShow = true;
          isShow = true;
        } else {
          item[j].isShow = false;
        }
      }
      tempCategory[i].isShow = isShow;
    }
  },

  getStructsByCategory: function(category) {
    var detail = '';
    for (var i = 0; i < category.length; i++) {
      var item = category[i].categoryItem;
      for (var j = 0; j < item.length; j++) {
        var good = item[j];
        if (good.commodityNum > 0) {
          detail += 'goodId:' + good.goodId + '&num:' + good.commodityNum + '|'
        }
      }
    }
    detail = detail.substr(0, detail.length - 1);
    console.log(detail);
    return detail;
  }
})