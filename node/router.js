const router = require('koa-router')()
const HomeController = require('./controler/home')
module.exports = (app) => {
    router.get('/', HomeController.Index)
    router.get('/user', HomeController.Login)
    router.post('/user/register', HomeController.register)
      router.get('/home', async (ctx, next) => {
        await next()
        ctx.response.type = 'text/html'
        ctx.response.body = `<h1>home</h1>`
      })
      
      router.get('/home/:id/:name',HomeController.HomeParams)
      router.get('/404', HomeController.NotFound)
      app.use(router.routes()).use(router.allowedMethods())
}

