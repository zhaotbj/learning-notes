const bodyParser = require('koa-bodyparser')
const ejs = require('koa-ejs');
const path = require('path');
const staticFiles = require('koa-static')
// 指定 public目录为静态资源目录，用来存放 js css images 等
const ip = require('ip')

const miSend = require("./mi-send")
const miLog = require("./mi-log")
module.exports = (app) => {
    app.use(miLog({
        env: app.env, // koa 提供的环境变量
        projectName: 'koa2-tutorial',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address()
    }))
    app.use(staticFiles(path.resolve(__dirname, "./public")))
    
    ejs(app, {
    root:path.resolve('views'),// 视图文件地址
    layout:false,
    viewExt:'html',//视图文件后缀名
    });
    app.use(bodyParser())
    app.use(miSend())
}