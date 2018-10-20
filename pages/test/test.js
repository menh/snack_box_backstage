const app = getApp()
Page({
wxPay: function() {
  
  const self = this;
  /*const id = e.target.dataset.id;
  const price = e.target.dataset.price;
  const goodName = e.target.dataset.goodname;
  const body = wx.getStorageSync('boxNumber') + ":" + goodName;
*/
  // console.log(app.globalData.openid);
  wx.request({
    url: app.globalData.serverIp + 'getPayParamers.do',
    data: {
      // totalFee: price,
      totalFee: 1,
      openId: app.globalData.openid,
      appId: app.globalData.appid,
      mchId: app.globalData.mchId,
      body: "test",
      boxBsn: "000000",
      goodId: "G00000001",
      orderTime: 2018012323
    },
    method: 'POST',
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      
       console.log(res.data);
      // console.log(id);
      self.toPay(res.data, "11111111");
    },
    fail: function (res) {
      wx.hideNavigationBarLoading()
      wx.showToast({
        title: '连接失败'
      })
    }
  });
},

toPay: function(args, goodId) {
  const self = this;
  var boxNum = wx.getStorageSync('boxNumber');
  // console.log(args);
  wx.requestPayment({
    'timeStamp': args.timeStamp,
    'nonceStr': args.nonceStr,
    'package': args.package,
    'signType': 'MD5',
    'paySign': args.paySign,
    'success': function (res) {
      //self.placeSnackOrder(goodId, boxNum);
      wx.showToast({
        title: '购买成功',
        icon: "success",
        duration: 1500
      })
    },
    'fail': function (res) { },
    'complete': function (res) { }
  })
}
})