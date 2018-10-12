// pages/good/good_add/good_add.js
const app = getApp()
var isEdit='true'
const upng = require('../../../utils/UPNG.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    structureItem: {
      structureId: '',//编号
      name: '盒子A',//结构名字
      remarks: '用于新用户',//备注
      goodsTypeQuantity: 0,//商品种类
      goodSum: 0,//商品数量
      cost: 0,//商品成本
      price: 0,//商品售价
      createTime: 0,
      lastEditTime: 0,
      useNum: 0,//共有多少盒子使用该结构
      display: '1',//是否显示
      goods: [{//商品
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
    },
    isEdit:'false',
    goodsArray: [[], []],
    goodsSource:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;

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
  good_delete: function (e) {
    let goodIndex = e.currentTarget.dataset.index;
    this.data.structureItem.goods.splice(goodIndex,1);
    this.setData({
      structureItem:this.data.structureItem
    })
    console.log(this.data.structureItem);
  },


  bindMultiPickerGoodChange:function(e){
    var goodTemp={};

    goodTemp.goodId = this.data.goodsSource[e.detail.value[0]].goodId;
    goodTemp.goodName = this.data.goodsSource[e.detail.value[0]].goodName;
    goodTemp.sum = this.data.goodsArray[1][e.detail.value[1]];
    this.data.structureItem.goods.push(goodTemp);
    this.setData({
      structureItem: this.data.structureItem
    })
  },


  getAllGood: function () {
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
      success: function (res) {
        console.log(res.data);
        self.setGoodsArray(res.data);
        console.log('goods')
        wx.hideLoading();
      },
      fail: function (res) {
        console.log("faile");
      }
    })
  },

  setGoodsArray: function (goods) {
    this.data.goodsSource = goods;
    var goodsArray = [[],[]];
    for(var i = 0; i < goods.length;i++){
      goodsArray[0].push(goods[i].goodName); 
    }
    goodsArray[1] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
    this.setData({
      goodsArray: goodsArray
    })
  },





















  bindGoodNameInput: function(e) {
    var goodName = e.detail.value
    this.data.good.goodName = goodName;
  },
  bindPriceInput: function(e) {
    var price = e.detail.value
    this.data.good.price = price;
  },
  bindGoodUnitInput: function(e) {
    var goodUnit = e.detail.value
    this.data.good.goodUnit = goodUnit;
  },
  bindReorderInput: function(e) {
    var reorder = e.detail.value
    this.data.good.reorder = reorder;
  },
  bindValidChange: function(e) {
    var temp = e.detail.value;
    this.data.good.valid = temp;
  },

  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      cateIndex: e.detail.value
    });

    this.setData({
      ['good.categoryId']: this.data.cate[parseInt(e.detail.value)].categoryId
    })

  },

  submit_good_edit: function(e) {
    console.log(this.data.good);
    const self = this;
    //res带着id，代表其为修改目录，若没有带着id，代表其为增加目录
    if (this.data.good.goodName != "" && this.data.good.reorder > 0) {
      wx.showModal({
        title: '确认修改',
        content:"该操作无法撤回,请谨慎操作",

        success: function(res) {

          if (res.confirm) {
            console.log('用户点击确定');
            self.updGood(self.data.good);
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

  updGood: function(good) {

    console.log(good.goodId);
    if (good.goodId == undefined) {
      good.goodId = '';
    }
    if (good.goodId == undefined){
      good.saleVolume = 0;
    }
    if (good.salePrice == undefined) {
      good.salePrice = 0;
    }
    if(good.valid == undefined){
      good.valid = '1';
    }
    if(good.reorder == undefined){
      good.reorder = '1';
    }
    if(good.saleVolume == undefined){
      good.saleVolume = 0;
    }
    wx.showLoading({
      title: '正在载入'
    })
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
        wx.hideLoading();
        wx.navigateBack({

        })
      },
      fail: function(res) {
        console.log("faile");
      }
    })
  },

  chooseImage: function() {

    　　　　　　　　　　
    const self = this;
    const platform = wx.getSystemInfoSync().platform;

    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success(res) {
        const canvas = wx.createCanvasContext('page-section-canvas');
        self.setData({
          b64: res.tempFilePaths[0]
        })
        canvas.drawImage(res.tempFilePaths[0], 0, 0, 100, 100);

        canvas.draw(false, () => {
          // 2. 获取图像数据
          wx.canvasGetImageData({
            canvasId: 'page-section-canvas',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            success(res) {
              if (platform === 'ios') {
                // 兼容处理：ios获取的图片上下颠倒 
                res = self.reverseImgData(res)
              }
              // 3. png编码
              let pngData = upng.encode([res.data.buffer], res.width, res.height)
              // 4. base64编码
              let base64 = 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(pngData)
              self.setData({
                ["good.goodPic"]: base64
              })
            }
          })
        })

      }
    })
  },

  //ios图片处理 
  reverseImgData(res) {
    var w = res.width
    var h = res.height
    let con = 0
    for (var i = 0; i < h / 2; i++) {
      for (var j = 0; j < w * 4; j++) {
        con = res.data[i * w * 4 + j]
        res.data[i * w * 4 + j] = res.data[(h - i - 1) * w * 4 + j]
        res.data[(h - i - 1) * w * 4 + j] = con
      }
    }
    return res
  },

  setGoodPic(base64) {
    const canvas = wx.createCanvasContext('page-section-canvas');
    canvas.drawImage(base64, 0, 0, 100, 100);
    canvas.draw(false);
  },

  getCateIndex(cates, categoryId) {
    console.log(cates);
    for (var i = 0; i < cates.length; i++) {
      if (cates[i].categoryId == categoryId) {
        return i;
      }
    }
    return 0;
  }
})