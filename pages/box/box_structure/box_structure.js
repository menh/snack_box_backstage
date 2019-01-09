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
    structId: '',
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
        //   structId: 'S00000000',
        //   goodId: "G00000001",
        //   goodNum: '1'
        // }, {
        //   structId: 'S00000000',
        //   goodId: "G00000002",
        //   goodNum: '3'
        // }, {
        //   structId: 'S00000000',
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
    self.data.structId = structs[0].structId;
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
    console.log(self.data.structId)

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
          self.setStructure(self, self.data.boxId, self.data.category, self.data.setInterfaceName,self.data.structId);
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })



  },

  setStructure: function(self, boxId, category, interfaceName,structId) {
    var structsJson = JSON.stringify(self.getStructsByCategory(category, structId));
    console.log(structsJson);
    wx.showLoading({
      title: '',
    })
    wx.request({
      url: app.globalData.serverIp + interfaceName + '.do',
      data: structsJson,
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        wx.hideLoading();
        self.setData({
          isEdit: false
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

  getStructsByCategory: function(category,structId) {
    var structs = [];
    for (var i = 0; i < category.length; i++) {
      var item = category[i].categoryItem;
      for (var j = 0; j < item.length; j++) {
        if (item[j].commodityNum > 0) {
          var structItem = {};
          structItem.structId = structId;
          structItem.goodId = item[j].goodId;
          structItem.goodNum = '' + item[j].commodityNum
          structs.push(structItem)
        }
      }
    }
    // console.log(structItem);

    return structs;
  }
})