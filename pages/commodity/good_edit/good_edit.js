// pages/good/good_add/good_add.js
const app = getApp()

const upng = require('../../../utils/UPNG.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    good: {
      categoryId: "C00000001",
      goodName: "",
      goodPic: "",
      goodUnit: "",
      price: '',
      reorder: '',
      valid: "0",
    },

    cate: [
      //   {
      //   categoryId: "C00000001",
      //   categoryName: "面包饼干2",
      //   goodNum: 2,
      //   reorder: 1,
      //   valid: "1"
      // }, 
    ],

    cateIndex: 0,

    b64: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var self = this;
    //获取cate列表
    wx.getStorage({
      key: 'cates',
      success: function(res) {
        self.setData({
          cate: res.data
        })
      }
    })


    var isEdit = options.isEdit;
    console.log(isEdit);
    //编辑
    if (isEdit == 'true') {
      wx.setNavigationBarTitle({
        title: '编辑商品'
      });
      wx.getStorage({
        key: 'good_edit_item',
        success: function(res) {
          self.setData({
            good: res.data
          })
          self.setGoodPic(res.data.goodPic)

          //获取cateIndex
          self.setData({
            cateIndex: self.getCateIndex(self.data.cate, self.data.good.categoryId)
          })

        }
      })
    } //添加
    else {
      wx.setNavigationBarTitle({
        title: '添加商品'
      });

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
              // if (platform === 'ios') {
              //   // 兼容处理：ios获取的图片上下颠倒 
              //   res = self.reverseImgData(res)
              // }
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
  },
  clone(obj) {
    var o;
    if (typeof obj == "object") {
      if (obj === null) {
        o = null;
      } else {
        if (obj instanceof Array) {
          o = [];
          for (var i = 0, len = obj.length; i < len; i++) {
            o.push(clone(obj[i]));
          }
        } else {
          o = {};
          for (var j in obj) {
            o[j] = clone(obj[j]);
          }
        }
      }
    } else {
      o = obj;
    }
    return o;
  }
})