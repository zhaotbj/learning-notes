# Node.js常见API
- 模块化和作用域
- Buffer
- File System
- Http
- Stream
- Events
- Middleware

## 模块化和作用域

### this
浏览器中的this指的是window
node脚本文件中未定义时全局的this指向global ，定义时指的是module.exports
```javascript
a = 10
console.log(global.a) // 10

```
- 全局作用域

没用用var let const 定义的声明的都是全局作用域

- 模块作用域
    
使用变量修饰的都是模块作用域 
- 函数作用域
- 块级作用域

### Buffer 
处理二进制数据
```javascript
// 数组拼接buffer
var rs = require('fs').createReadStream('test.txt', { highWaterMark: 10 })
var data = []
rs.on('data', function (chunk) {
  data.push(chunk)
})
rs.on('end', function (chunk) {
  var buf = Buffer.concat(data)
  console.log(buf.toString())
})
```
### File System
- readFile 

用来异步读取文本文件中的内容，会将一个文件的全部内容都读到内存中，适用于体积较小的文本文件；
读取大文件，使用stream， readFileSync直接返回文本数据内容
- readFile 第一个参数是文件名，如果没有回自动创建。
- fs.stat 获取文件的状态
通常开发者可以在调用open() read() 或者write方法之前调用fs.stat方法，用来判断该文件是否存在。
fs.stat 和fs.fstat功能是一样的，

区别是 fstat方法第一个参数是文件描述符，格式为integer，fstat方法通常搭配open方法使用，因为open方法返回的结果就是一个文件描述。
```javascript
var fs= require('fs')
var data = fs.readFileSync('test.txt', {encoding: 'utf-8'})
console.log(data)


fs.writeFile('foo.txt', "hello world", {flag: 'a', encoding: 'utf-8'},
function (err) {
  if(err) {
    console.log(err)
    return
  } 
  console.log('success')
})
```
- fs.stat
```javascript
// 用来获取文件的状态 来判断文件是否存在
// 常在调用open read witer是调用
fs.stat("foo.txt", function(err, result) {
  if(err) {
    console.log(err)
    return
  }
  console.log(result)
}) 

// fs.fstat

fs.open("foo.txt",'a',function(err,fd){
    if(err){
        console.log(err);
        return;
    }
    console.log(fd);
    fs.fstat(fd,function(err,result){
        if(err){
            console.log(err);
            return;
        }
        console.log(result);
    })
})
```
```javascript
// 例子
// 获取目录下的说有文件名。
// fs.readdir 和fs.stat两个api
var fs = require("fs");
function getAllFileFromPath(path) {
    fs.readdir(path, function (err, res) {
        for (var subPath of res) {
            var statObj = fs.statSync(path + "/" + subPath); //这里使用了同步方法而非异步
            if (statObj.isDirectory()) {//判断是否为文件夹
                console.log("Dir:", subPath);
                getAllFileFromPath(path + "/" + subPath)//如果是文件夹，递归获取子文件夹中的文件列表
            } else {
                console.log("File:", subPath);
            }
        }
    })
}
getAllFileFromPath(__dirname);
```
### http
```javascript
var http = require('http')
var server =http.createServer(function(req, res) {
  // 处理http请求
var method = req.method
var url = req.url
console.log(method, url)
  res.writeHead(200, {'content-type': 'text/plain'})
  res.end('hello  node!')
})
// 监听来自客户端的事件
server.on('connection', function(req, res) {
  console.log('connection')
})
server.on('request', function(req, res) {
  console.log('request')
})
server.listen(8080)

// 当访问8080时，控制台输出 
// connected
// request
// request 打印两次是因为其中一个是favicon.ico的请求
```
```javascript
// 一个简单的静态服务器
var http = require('http')
var fs = require('fs')
var server = http.createServer(function (req, res) {

  if (req.url == '/') { //访问8080
    var fileList = fs.readdirSync('./')
    res.writeHead(200, { 'content-type': 'text/plain' })
    // 将数组转化为字符串返回
    res.end(fileList.toString())
  } else {
    var path = req.url;
    // 在路径字符串前加.表示当前目录，避免在nix系统访问/文件夹
    fs.readFile('.' + path, function (err, data) {
      if (err) {
        res.end('不存在')
        throw err;
      }
      res.writeHead(200, { 'content-type': 'text/plain' })
      res.end(data)
    })
  }

})
//1buffer.js,2http.js,3httpexmple.js,4.js,foo.txt,login.html,md.md,readFile.js,test.txt,this.js,upload.js
server.listen(8080)
// 处理异常
process.on('uncaughtException', function() {
  console.log('got error')
})
```
#### 处理http请求
  - method url header
 
get post put delete update
```javascript
  // 处理http请求
var method = req.method
var url = req.url
```
#### Response 对象
#### 上传数据

- upload.html
```html
  <form action="/upload" method="post" enctype="multipart/form-data">
    <input type="file" name="file"/>
    <br/>
    <input type="text" name="kind">
    <input type="submit" name="submit" value="submit"/>
</form>
```
- js
```javascript
// npm 安装依赖  formidable 
var http = require('http')
var fs = require('fs')
var formidable = require("formidable");
var server = http.createServer(function (req, res) {
  if (req.url == '/upload') {
    switch (req.method) {
      case 'GET':
        fs.createReadStream('upload.html').pipe(res)
        break
      case 'POST':
        dealpost(req, res) // 自定义方法处理
        break
      default:
        console.log('other request')
    }
  } else {
    res.writeHead(302, {
      'Location': './upload'
    })
    res.end() // 将所有的url访问都转到/login路径
  }
})

function dealpost(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true
  form.uploadDir = __dirname
  form.parse(req, function(err, fields, files) {
    if(err) {
      throw err
    }
    console.log(fields)
    console.log(files)
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end('upload finished')
  })
}
server.listen(8080)
```
### stream
stream 模块是node操作流失数据

> 四种基础的stream类型
1. readable 可读流
2. writable 可写流
3. duplex 即可读又可写的流
4. transform 操作写入的数据，然后读取结果，通常用于数据数据和输出数据不要求匹配的场景，
```javascript
var stream =require('stream')
var fs = require('fs')
var readStream = fs.createReadStream("./text.txt", 'utf-8')
readStream.on('data', function(data) {
  console.log(data)
})
readStream.on('close', function() {
  console.log('close')
})
readStream.on('error', function() {
  console.log('error')
})
```

当创建一个可读流读取一个较大的文件，在调用pipe方法将数据通过一个可写流写入另一个位置。如果读取的速度大于写入的速度，那么node将会在内存中缓存这些数据。

pipe 方法相当于在可读流和可写流之间加起来的桥梁，是的数据可以通过管道由可读流进入可写流，


- 使用pipe改写的静态文件服务器
```javascript
var stream = require('stream')
var http = require('http')
var fs = require('fs')
var server = http.createServer(function (req, res) {
  if (req.url == '/') {
    var fileList = fs.readdirSync('./')
    res.writeHead(200, { 'Content-type': 'text/plain' })
    res.end(fileList.toString())
  } else {
    try {
      var readStream = fs.createReadStream(path).pipe(res);
    } catch (e) {
      res.end("file not exists");
    }
  }
})
server.listen(3000)
console.log("Listening on 3000");

//处理异常
process.on("uncaughtException", function () {
  console.log("got error");
})

// pipe方法接收一个writable对象，当readable对象调用pipe方法时，会在内部调用writable对象的write方法进行写入。
```
### Events
##### 事件和监听器
eventsnode程序中的对象会产生一系类的事件，他们被称为事件触发器，

所有能触发事件的对下你给都是eventEmitter类的实例。eventEmitter定义了on方法。

```javascript
var eventEmitter = require("events");
var myEmitter = new eventEmitter();
myEmitter.on("begin",function(){
    console.log("begin");
})
myEmitter.emit("begin");
```
#### 中间件middleware
- 1 中间价的概念

express 本身是有路由和中间件构成的，从本质上来说，express的运行就是在不断调用这个中间件。

中间件的本质上是接收请求并且做出相应动作的函数，该函数通常接收req和res作为参数，以便对request和response对象进行操作，在web应用中，客户端发起的每一个请求，首先要经过中间件的处理才能继续向下。

中间件的第三个参数一般写作next,它代表一个方法，即下一个中间件。如果我们在中间件的方法体中调用了next方法，即表示请求会经过下一个中间件处理。
- 2中间件的功能

中间件是一个函数，可以做到node代码能做到的任何事情，除此之外还包括修改request和response对象、终结请求-响应循环，以及调用下一个中间件等功能，这通常是通过在内部调用next方法来实现的。如果某个中间件中没有调用next方法，则表示对请求的处理到此为止，下一个中间件不会被执行。
- 中间件的加载

中间件的加载使用use方法来实现，改方法定义在express或者koa对象的实例上，
```javascript
var app =express()
app.use(md)
```
- express中的中间件

express应用可使用如下几种中间件
- 应用级中间件
- 路由级中间件
- 错误处理中间件
- 内置中间件
- 第三方中间件
```
应用级中间件  使用app.use方法，绑定在app对象上的中间件
路由级中间件 路由处理是express的一部分，koa是通过第三方 koa-router

```