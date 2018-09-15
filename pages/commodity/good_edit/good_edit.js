// pages/good/good_add/good_add.js

const upng = require('../../../utils/UPNG.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index: 0,
    b64: '',
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

  bindPickerChange: function(e) {

    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
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
        console.log(res.tempFilePaths[0])
        self.setData({
          b64: res.tempFilePaths[0]
        })
        canvas.drawImage(res.tempFilePaths[0], 0, 0, 100, 100);

        canvas.draw(false, () => {
          // 2. 获取图像数据
          console.log('nihao');
          wx.canvasGetImageData({
            canvasId: 'page-section-canvas',
            x: 0,
            y: 0,
            width: 100,
            height: 100,
            success(res) {
              // 3. png编码
              let pngData = upng.encode([res.data.buffer], res.width, res.height)
              // 4. base64编码
              let base64 = 'data:image/jpeg;base64,' + wx.arrayBufferToBase64(pngData)
              console.log(base64)
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
})