# 小程序使用canvas自适应屏幕画海报并保存图片
小程序canvas的API并没有像其他的一样支持小程序独有的 rpx 自适应尺寸单位，在绘制内容时所应用的单位仍然是 px，那么如何实现不同尺寸屏幕的自适应呢？

我们的在开发中常用的参考屏幕尺寸（iPhone6）为：375*667；

那么想要适应其他尺寸的屏幕时只需按照iPhone6的绘制大小按比例进行换算即可：
## 获取系统屏幕尺寸
先利用wx.getSystemInfo （获取系统信息）的API获取屏幕宽度，然后除iPhone6的屏幕宽度，即可得到相对单位
```javascript
// 在onLoad中调用
const that = this
wx.getSystemInfo({
  success: function (res) {
    console.log(res)
    that.setData({
      model: res.model,
      screen_width: res.windowWidth/375,
      screen_height: res.windowHeight
    })
  }
})
```
## 在绘制方法中将参数乘以相对单位即可实现自适应
这里的rpx是相对不同屏幕宽度的相对单位，测量出得实际宽度，就是实际测出的px像素值*rpx就可以了；之后无论实在iPhone5，iPhone6，iPhone7...都可以进行自适应。
## 这里的html也要动态的设置宽和高
```html
<canvas  canvas-id="PosterCanvas" style="width:{{screen_width*375+'px'}}; height:{{screen_height*1.21+'px'}}"></canvas>
```
```javascript
drawPoster(){
    let ctx = wx.createCanvasContext('PosterCanvas'),that=this.data;
    console.log('手机型号' + that.model,'宽'+that.screen_width*375,'高'+ that.screen_height)
    let rpx = that.screen_width
    //这里的rpx是相对不同屏幕宽度的相对单位，实际的宽度测量，就是实际测出的px像素值*rpx就可以了；之后无论实在iPhone5，iPhone6，iPhone7...都可以进行自适应。
    ctx.setFillStyle('#1A1A1A')
    ctx.fillRect(0, 0, rpx * 375, that.screen_height * 1.21)
    ctx.fillStyle = "#E8CDAA";
    ctx.setFontSize(29*rpx)
    ctx.font = 'normal 400  Source Han Sans CN';
    ctx.fillText('Hi 朋友', 133*rpx,66*rpx)
    ctx.fillText('先领礼品再买车', 84*rpx, 119*rpx)
    ctx.drawImage('../../img/sell_index5.png', 26*rpx, 185*rpx, 324*rpx, 314*rpx)
    ctx.drawImage('../../img/post_car2x.png', 66 * rpx, 222 * rpx, 243 * rpx, 145 * rpx)
    ctx.setFontSize(16*rpx)
    ctx.font = 'normal 400 Source Han Sans CN';
    ctx.fillText('长按扫描获取更多优惠', 108*rpx, 545*rpx)
    ctx.drawImage('../../img/code_icon2x.png', 68 * rpx, 575 * rpx, 79 * rpx, 79 * rpx)
    ctx.drawImage('../../img/code2_icon2x.png', 229 * rpx, 575 * rpx, 79 * rpx, 79 * rpx)
    ctx.setStrokeStyle('#666666')
    ctx.setLineWidth(1*rpx)
    ctx.lineTo(187*rpx,602*rpx)
    ctx.lineTo(187*rpx, 630*rpx)
    ctx.stroke()
    ctx.fillStyle = "#fff"
    ctx.setFontSize(13 * rpx)
    ctx.fillText('xxx科技汽车销售公司', 119 * rpx, 663 * rpx)
    ctx.fillStyle = "#666666"
    ctx.fillText('朝阳区·望京xxx科技大厦', 109 * rpx, 689 * rpx)
    ctx.setFillStyle('#fff')
    ctx.draw()
  },
```

![](https://user-gold-cdn.xitu.io/2019/7/23/16c1e869b02dee5f?w=740&h=676&f=png&s=112119)
![](https://user-gold-cdn.xitu.io/2019/7/23/16c1e85e17175ac2?w=531&h=141&f=png&s=15892)
![](https://user-gold-cdn.xitu.io/2019/7/23/16c1e859b4a1f083?w=490&h=212&f=png&s=19953)

![](https://user-gold-cdn.xitu.io/2019/7/23/16c1e86170a87a04?w=482&h=157&f=png&s=16923)

## 保存到相册
很简单就是在画完图片之后的draw回调函数里调用canvasToTempFilePath()生产一个零时内存里的链接，然后在调用saveImageToPhotosAlbum()就可以了；其中牵扯到授权，如果你第一次拒绝了授权，你第二次进入的时候在iphone手机上是不会再次提醒你授权的，这时就需要你手动调用了；以下附上代码！
```javascript
ctx.draw(true, ()=>{
        // console.log('画完了')
        wx.canvasToTempFilePath()({
          x: 0,
          y: 0,
          width: rpx * 375,
          height: that.screen_height * 1.21,
          canvasId: 'PosterCanvas',
          success: function (res) {
            // console.log(res.tempFilePath);
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: (res) => {
                console.log(res)
              },
              fail: (err) => { }
            })

          }
        }) 
      })
```
## 拒绝授权后再次提醒授权的代码
```javascript
mpvue.saveImageToPhotosAlbum({
        filePath: __path,
        success(res) {
          mpvue.showToast({
          title: '保存成功',
          icon: 'success',
          duration: 800,
          mask:true
          });
         },
        fail(res) {
            if (res.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || res.errMsg === "saveImageToPhotosAlbum:fail auth deny" || res.errMsg === "saveImageToPhotosAlbum:fail authorize no response") {

          mpvue.showModal({
                title: '提示',
                content: '需要您授权保存相册',
                showCancel: false,
                success:modalSuccess=>{
                  mpvue.openSetting({
                    success(settingdata) {
                      // console.log("settingdata", settingdata)
                      if (settingdata.authSetting['scope.writePhotosAlbum']) {
                        mpvue.showModal({
                          title: '提示',
                          content: '获取权限成功,再次点击图片即可保存',
                          showCancel: false,
                        })
                      } else {
                        mpvue.showModal({
                          title: '提示',
                          content: '获取权限失败，将无法保存到相册哦~',
                          showCancel: false,
                        })
                      }
                    },
                    fail(failData) {
                      console.log("failData",failData)
                    },
                    complete(finishData) {
                      console.log("finishData", finishData)
                    }
                  })
                }
              })
          }
         }
      });

```
至此就算完了，能帮到你就给点个赞吧！