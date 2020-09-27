# 笔记

![](https://cdn.nlark.com/yuque/0/2020/png/1703004/1601189469278-f188ff82-f426-46a9-babb-9cb92eb6aa2f.png)node项目热更新

```
全局安装 nodemon：
npm install -g nodemon

本地项目中也需要安装：
npm i nodemon -S
```
nodemon index.js
通过 Nodemon 启动应用之后，不管是修改了代码，还是安装了新的 npm 包，Nodemon 都会重新启动应用

## 部署运行
线上部署运行的话，方法也有很多，我们推荐使用 `pm2`。
`pm2` 是一个带有负载均衡功能的Node应用的进程管理器。


安装方法与 `nodemon` 相似，需要全局安装：
```
npm i pm2 -g
```


运行方法：
```
pm2 start app.js
```
### 配置文件
默认会监听当前目录下所有文件，可以设置不许要监听的文件 新建 nodemon.json
```javascript
{
	"restartable": "rs",
	"ignore": [
		".git",
		".svn",
		"node_modules/**/node_modules"
	],
	"verbose": true,
	"execMap": {
		"js": "node --harmony"
	},
	"watch": [
		
	],
	"env": {
		"NODE_ENV": "development"
	},
	"ext": "js json"
}
```
```javascript
app.use(async (ctx, next) => {
  console.log('中间件1 doSoming')
  await next();
  console.log('中间件1 end')
})

app.use(async (ctx, next) => {
  console.log('中间件2 doSoming')
  await next();
  console.log('中间件2 end')
})

app.use(async (ctx, next) => {
  console.log('中间件3 doSoming')
  await next();
  console.log('中间件3 end')
})

// 中间件1 doSoming
// 中间件2 doSoming
// 中间件3 doSoming
// 中间件3 end
// 中间件2 end
// 中间件1 end
```
## koa-router
koa-router提供了get post put delete接口处理各种请求，常用的是get post
解析参数的三种方式
```javascript
http://localhost:3000/home?id=12&name=ikcamp
ctx.request.query //对象
ctx.request.queryString // 字符串

// { id: '12', name: 'ikcamp' }
// id=12&name=ikcamp

http://localhost:3000/home/12/ikcamp
koa-bodyparser 处理参数  
ctx.request.body
```
### 分层
```json
controller
	home.js
service
	home.js
app.js
router.js
```
### ejs模板引擎
用<%...%>包含js代码
用<%=...%>输出变量 变量若包含 '<' '>' '&'等字符 会被转义
用<%-...%>输出变量 不转义
用<%- include('user/show') %>引入其他模板 包含 ./user/show.ejs
用<%# some comments %>来注释，不执行不输出
<%% 转义为 '<%'
<% ... -%> 删除新的空白行模式?
<%_ ... _%> 删除空白符模式
## 处理静态资源
> 无非花开花落，静静



```javascript
npm i koa-static -S
const staticFiles = require('koa-static')
  // 指定 public目录为静态资源目录，用来存放 js css images 等
  app.use(staticFiles(path.resolve(__dirname, "./public")))
```
```json
├── controller/
  │     ├── home.js
  ├── service/
  │     ├── home.js
  ├── views/
  │     ├── common/ 
  │         ├── header.html
  │         ├── footer.html
  │         ├── layout.html
  │         ├── layout-home.html
  │     ├── home/ 
  │         ├── index.html
  │         ├── login.html
  │         ├── success.html
  ├── public/ 
  │     ├── home/ 
  │         ├── main.css
  ├── app.js
  ├── router.js
  ├── package.json
```
## 提取中间件
```json
+middleware
	+ mi-send
const miSend = require('./mi-send')
module.exports = (app) => {
  app.use(staticFiles(path.resolve(__dirname, "../public")))

  app.use(nunjucks({
    ext: 'html',
    path: path.join(__dirname, '../views'),
    nunjucksConfig: {
      trimBlocks: true
    }
  }));

  app.use(bodyParser())
  app.use(miSend())
}

app.js
const middleware = require('./middleware')
middleware(app)
```
## log日志中间件

- 显示程序运行状态
- 帮助开发者排除问题故障
- 结合专业的日志分析工具（如 ELK ）给出预警
### 日志分类
日志可以大体上分为访问日志和应用日志。访问日志一般记录客户端对项目的访问，主要是 `http` 请求。这些数据属于运营数据，也可以反过来帮助改进和提升网站的性能和用户体验；应用日志是项目中需要特殊标记和记录的位置打印的日志，包括出现异常的情况，方便开发人员查询项目的运行状态和定位 `bug` 。应用日志包含了`debug`、`info`、`warn` 和 `error`等级别的日志。


## 规范
项目结构如下
```
├─ controller/          // 用于解析用户的输入，处理后返回相应的结果
├─ service/             // 用于编写业务逻辑层，比如连接数据库，调用第三方接口等
├─ errorPage/           // http 请求错误时候，对应的错误响应页面
├─ logs/                // 项目运用中产生的日志数据
├─ middleware/          // 中间件集中地，用于编写中间件，并集中调用
│  ├─ mi-http-error/
│  ├─ mi-log/
│  ├─ mi-send/
│  └── index.js
├─ public/              // 用于放置静态资源
├─ views/               // 用于放置模板文件，返回客户端的视图层
├─ router.js            // 配置 URL 路由规则
└─ app.js               // 用于自定义启动时的初始化工作，比如启动 https，调用中间件，启动路由等
```


