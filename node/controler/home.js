module.exports = {
    Index: async (ctx, next) => {
        let stime = new Date().getTime()
        let end = new Date().getTime()
        ctx.response.type = 'text/html'
        ctx.response.body = `<h1>Hello World${end - stime}ms</h1>`
        console.log('响应时间', `${end - stime}ms`)
        await ctx.render("index", {
          title: 'titlesss',
          time: '响应时间'+ `${end - stime}ms`
          });
      },
    HomeParams:  async(ctx, next) =>{
        console.log(ctx.response.query)
        console.log("params",ctx.params)
        await next()
        ctx.response.body = '/home/:id/:name'
      },
    NotFound: async(ctx, next) =>{
        await next()
        ctx.response.body = "<h1>404</h1>"
      }
}