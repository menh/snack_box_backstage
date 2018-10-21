// pages/good/good_add/good_add.js
const app = getApp()
var isEdit = 'true'
const upng = require('../../../utils/UPNG.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    struct: {
      structId: '', //编号
      structName: '', //结构名字
      structRemark: '', //备注
      commodityKind: 0, //商品种类
      commodityNum: 0, //商品数量
      commodityCost: 0, //商品成本
      commodityPrice: 0, //商品售价
      commodityUse: 0, //共有多少盒子使用该结构
      structDisplay: '0', //是否显示
    },
    goods: [],

    isEdit: 'false',
    goodsArray: [
      [],
      []
    ],
    goodsSource: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    this.data.isEdit = options.isEdit
    isEdit = options.isEdit;
    console.log(isEdit);
    //编辑
    if (isEdit == 'true') {
      wx.setNavigationBarTitle({
        title: '查看结构'
      });
      console.log(JSON.parse(options.structureItem))
      self.setData({
        structureItem: JSON.parse(options.structureItem)
      })
    } //添加
    else {
      wx.setNavigationBarTitle({
        title: '添加结构'
      });
      this.getAllGood();
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
  good_delete: function(e) {
    let goodIndex = e.currentTarget.dataset.index;
    this.data.goods.splice(goodIndex, 1);
    this.setData({
      goods: this.data.goods
    })
  },


  bindMultiPickerGoodChange: function(e) {
    var goodTemp = {};
    goodTemp.goodId = this.data.goodsSource[e.detail.value[0]].goodId;
    goodTemp.goodName = this.data.goodsSource[e.detail.value[0]].goodName;
    goodTemp.sum = this.data.goodsArray[1][e.detail.value[1]];
    this.data.goods.push(goodTemp);
    this.setData({
      goods: this.data.goods
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
        self.setGoodsArray(res.data);
        console.log('goods')
        wx.hideLoading();
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  setGoodsArray: function(goods) {
    this.data.goodsSource = goods;
    var goodsArray = [
      [],
      []
    ];
    for (var i = 0; i < goods.length; i++) {
      goodsArray[0].push(goods[i].goodName);
    }
    goodsArray[1] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    this.setData({
      goodsArray: goodsArray
    })
  },

  bindStructNameInput: function(e) {
    var structName = e.detail.value
    this.data.struct.structName = structName;
  },
  bindStructRemarkInput: function(e) {
    var structRemark = e.detail.value
    this.data.struct.structRemark = structRemark;
  },
  bindValidChange: function(e) {
    var temp = e.detail.value;
    this.data.struct.structDisplay = temp;
  },



  submit_struct: function(e) {
    console.log(this.data.struct);
    const self = this;

    //res带着id，代表其为修改目录，若没有带着id，代表其为增加目录
    if (this.data.struct.structName != "") {

      wx.showModal({
        title: '确认上传',
        content: "该操作无法撤回,请谨慎操作",
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定');
            if (self.data.isEdit == 'true') {
              self.updStruct(self.data.struct);
            } else {
              self.addStruct(self.data.struct);
            }
            //调用接口
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    } else {
      wx.showModal({
        content: '请填写结构名',
        showCancel: false
      })
    }
  },

  machStruct:function(struct){
    if (struct.structId == undefined) {
      struct.structId = '';
    }
    if (struct.structName == undefined) {
      struct.structName = '';
    }
    if (struct.structRemark == undefined) {
      struct.structRemark = '';
    }
    if (struct.commodityCost == undefined) {
      struct.commodityCost = '0';
    }
    if (struct.commodityPrice == undefined) {
      struct.commodityPrice = '0';
    }
    if (struct.commodityKind == undefined) {
      struct.commodityKind = '0';
    }
    if (struct.commodityNum == undefined) {
      struct.commodityNum = '0';
    }
    if (struct.commodityUse == undefined) {
      struct.commodityUse = '0';
    }
    if (struct.structDisplay == undefined) {
      struct.structDisplay = '0';
    }
  },

  addStruct: function (struct) {
    var self = this;
    this.machStruct(struct);
    wx.showLoading({
      title: '正在载入'
    })
    wx.request({
      url: app.globalData.serverIp + 'AddCommodityStruct.do',
      data: {
        structName: struct.structName,
        structRemark: struct.structRemark,
        structDisplay: struct.structDisplay,
        commodityNum: '0',
        commodityKind: '0',
        commodityCost: '0',
        commodityPrice: '0',
        commodityUse: '0',

      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(res.data);
        self.addGoods(self.data.goods,res.data);
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  },

  addGoods: function (goods,strcutId) {
    var self = this;
    var goodsRes = [];
    for (var i = 0; i < goods.length; i++) {
      var goodTemp = {};
      goodTemp.STRUCT_ID = strcutId;
      goodTemp.GOOD_ID = goods[i].goodId;
      goodTemp.GOOD_SUM = goods[i].sum;
      goodsRes.push(goodTemp);
    }
    var temp = JSON.stringify(goodsRes);
    console.log(temp);
    wx.request({
      url: app.globalData.serverIp + 'AddStructGood.do',
      data: temp,
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