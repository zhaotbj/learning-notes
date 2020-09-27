module.exports = {
    Index: async (ctx, next) => {
        let stime = new Date().getTime()
        let end = new Date().getTime()
        ctx.response.type = 'text/html'
        ctx.response.body = `<h1>Hello World${end - stime}ms</h1>`
        console.log('响应时间', `${end - stime}ms`)
        await ctx.render("index", {
          title: 'iKcamp欢迎您',
          time: '响应时间'+ `${end - stime}ms`
          });
      },
      Login: async(ctx, next) => {
        await ctx.render('home/login', {
          title: 'iKcamp欢迎您',
          btnName: 'GoGoGo'
        })
      },
      register: async(ctx, next) => {
        console.log('登录参数',ctx.request.body)
        let params = ctx.request.body
        let name = params.name
        let password = params.password
        // let res = await HomeService.register(name,password)
        let res = await reg(name,password)
          console.log('登录-----',res)
        if(res.status == "-1"){
          await ctx.render("home/login", res.data)
        }else{
          ctx.state.title = "个人中心"
          await ctx.render("home/success", res.data)
        }
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

function reg(name, pwd) {
  if(name == 'ikcamp' && pwd == '123456'){
    data = {
      status: 0,
      data: {
        title: "个人中心",
        content: "欢迎进入个人中心"
      }
    }
  }else{
    data = {
      status: -1,
      data: {
        title: '登录失败',
        content: "请输入正确的账号信息"
      }
    }
  }
  return data
}