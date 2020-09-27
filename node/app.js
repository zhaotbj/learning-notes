const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const bodyParser = require('koa-bodyparser')
const ejs = require('koa-ejs');
const path = require('path');
const staticFiles = require('koa-static')
// 指定 public目录为静态资源目录，用来存放 js css images 等
app.use(staticFiles(path.resolve(__dirname, "./public")))
app.use(bodyParser())
ejs(app, {
  root:path.resolve('views'),// 视图文件地址
  layout:false,
  viewExt:'html',//视图文件后缀名
});
router(app)
app.listen(3001, () => {
  console.log('server is running at http://localhost:3001')
})