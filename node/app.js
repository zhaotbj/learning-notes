const Koa = require('koa')
const app = new Koa()

// 增加代码
app.use(async (ctx, next) => {
    let stime = new Date().getTime()
  await next()
  let end = new Date().getTime()
  ctx.response.type = 'text/html'
  ctx.response.body = `<h1>Hello World${end-stime}ms</h1>`
  console.log('响应时间', `${end-stime}ms`)
})

app.use(async (ctx, next) =>{
    console.log("中间件1 doSoming")
    await next()
    console.log('中间件1 end')
})

app.use(async (ctx, next) =>{
    console.log("中间件2 doSoming")
    await next()
    console.log('中间件2 end')
})
app.use(async (ctx, next) =>{
    console.log("中间件3 doSoming")
    await next()
    console.log('中间件3 end')
})

// 中间件1 doSoming
// 中间件2 doSoming
// 中间件3 doSoming
// 中间件3 end
// 中间件2 end
// 中间件1 end
app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})