// pages/good/good.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navActive: '0',
    //排序按照优先字段来
    cate: [],

    good: [],

    structs: [],

    structure: [{
      structureId: 's000000001', //编号
      name: '盒子A', //结构名字
      remarks: '用于新用户', //备注
      goodsTypeQuantity: 3, //商品种类
      goodSum: 7, //商品数量
      cost: 17.3, //商品成本
      price: 22, //商品售价
      useNum: 20, //共有多少盒子使用该结构
      display: '1', //是否显示
      goods: [{ //商品
        goodId: 'G000000001',
        goodName: '好丽友',
        cost: 2.8,
        price: 3.5,
        sum: 2
      }, {
        goodId: 'G000000002',
        goodName: '千叶面包',
        cost: 1.3,
        price: 2,
        sum: 3
      }, {
        goodId: 'G000000003',
        goodName: '八宝粥',
        cost: 3.8,
        price: 4.5,
        sum: 2
      }]
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.updGood("G00000004");
    // this.delGood();
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
    //这里应该调用接口更新cate（目录）
    this.setData({
      cate: '',
      good: '',
    })
    this.getAllCate();
    this.getAllStructure();

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
    let categoryIndex = e.currentTarget.dataset.index;
    console.log(categoryIndex);
    wx.navigateTo({
      url: "/pages/commodity/cate_edit/cate_edit?isEdit=true&cateItem=" + JSON.stringify(this.data.cate[categoryIndex]),
    })
  },

  good_add: function(e) {
    wx.setStorageSync('cates', this.data.cate);
    wx.navigateTo({
      url: "/pages/commodity/good_edit/good_edit?isEdit=false",
    })
  },

  good_edit: function(e) {
    let goodIndex = e.currentTarget.dataset.index;
    console.log(goodIndex);
    wx.setStorageSync('good_edit_item', this.data.good[goodIndex]);
    wx.setStorageSync('cates', this.data.cate);
    wx.navigateTo({
      url: "/pages/commodity/good_edit/good_edit?isEdit=true",
    })
  },

  cate_delete: function(e) {
    const self = this;
    let index = e.currentTarget.dataset.index;
    var cateItem = this.data.cate[index];
    wx.showModal({
      title: '您确定要删除"' + cateItem.categoryName + '"吗',
      content: '该操作将会删除其下所有商品且无法撤回，请谨慎操作',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          self.deleteCategory(cateItem.categoryId);
          //调用删除接口
          //刷新cate
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },

  getAllStructure: function(e) {
    var self = this;
    wx.request({
      url: app.globalData.serverIp + 'GetCommodityStruct.do',
      data: {
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log("structure");
        console.log(res.data);
        self.setData({
          structs: res.data
        })
        // wx.hideLoading();
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  structure_add: function(e) {
    wx.navigateTo({
      url: "/pages/commodity/structure_edit/structure_edit?isEdit=false",
    })
  },

  structure_edit: function(e) {
    let structureIndex = e.currentTarget.dataset.index;
    console.log(structureIndex);
    wx.navigateTo({
      url: "/pages/commodity/structure_edit/structure_edit?isEdit=true&structItem=" + JSON.stringify(this.data.structs[structureIndex]),
    })
  },

  structure_delete: function(e) {
    const self = this;
    let index = e.currentTarget.dataset.index;
    var structureItem = this.data.structs[index];
    wx.showModal({
      title: '您确定要删除"' + structureItem.struct.structName + '"吗',
      content: '该操作无法撤回，请谨慎操作',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          self.deleteStruct(structureItem.struct.structId);
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  good_delete: function(e) {
    const self = this;
    let index = e.currentTarget.dataset.index;
    var goodItem = this.data.good[index];
    wx.showModal({
      title: '您确定要删除"' + goodItem.goodName + '"吗',
      content: '该操作无法撤回，请谨慎操作',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          self.deleteGood(goodItem.goodId);
          //调用删除接口
          //刷新cate
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },

  getAllCate: function() {
    var self = this;
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'getAllCategory.do',
      data: {
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        console.log("category");
        self.setData({
          cate: res.data
        })

        self.getAllGood();
        // wx.hideLoading();
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  deleteCategory: function(categoryId) {
    var self = this;
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'delCategory.do',
      data: {
        categoryId: categoryId,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data) {
          self.getAllCate()
        } else {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '请先删除该目录全部商品',
          })
        }
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  getAllGood: function() {
    var self = this;
    wx.showLoading({
      title: '正在载入'
    });
    wx.request({
      url: app.globalData.serverIp + 'getAllGood.do',
      data: {
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
        self.setGoodsCate(res.data);
        console.log("goods");
        self.setData({
          good: res.data
        })
        wx.hideLoading();

      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },
  setGoodsCate(goods) {
    var cates = this.data.cate
    for (var i = 0; i < goods.length; i++) {
      for (var j = 0; j < cates.length; j++) {
        if (goods[i].categoryId == cates[j].categoryId) {
          goods[i].categoryName = cates[j].categoryName;
          break;
        }
      }
    }
  },

  updGood: function(good) {
    // var self = this;
    wx.request({
      url: app.globalData.serverIp + 'updGood.do',
      data: {
        goodId: good.goodId,
        price: good.price,
        salePrice: good.salePrice,
        goodName: good.goodName,
        goodPic: good.goodPic,
        goodBrief: good.goodBrief,
        saleVolume: good.saleVolume,
        goodType: good.goodType,
        goodUnit: good.goodUnit,
        categoryId: good.categoryId,
        valid: good.valid,
        reorder: good.reorder,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function(res) {
        console.log(res.data);
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  deleteGood: function (goodId) {

    var self = this;
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'delGood.do',
      data: {
        goodId: goodId,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data) {
          self.getAllGood()
        } else {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '出现问题',
          })
        }
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  },

  deleteStruct: function (structId) {

    var self = this;
    console.log(structId);
    wx.showLoading({
      title: '正在载入'
    }) 
    wx.request({
      url: app.globalData.serverIp + 'DelCommodityStruct.do',
      data: {
        structId: structId,
        openid: app.globalData.openid
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        wx.hideLoading();
        if (res.data) {
          self.getAllStructure()
        } else {
          wx.showModal({
            title: '',
            showCancel: false,
            content: '出现问题',
          })
        }
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  },
})