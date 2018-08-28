const koa = require('koa')
const koaBody =  require('koa-body')
const router  = require('./router')
const logger = require('./middleware/logger')
const httpError = require('./middleware/httpError')
const cors = require('koa2-cors')
const config = require("./config")
const ip = require('ip')
const path = require("path")
const static = require('koa-static')
const session = require("koa-session")
const app = new koa()

//静态资源
app.use(static(path.resolve(__dirname, "./public")))
app.use(httpError({
  errorPageFolder: path.resolve(__dirname, './static/errHtml')
}))
 app.use(logger({
   env: app.env,
   projectName: 'koa2-loggers',
   appLogLevel: 'debug',
   dir: 'logs',
   serverIp: ip.address()
 }))
app.use(cors())
app.use(session({
  key: "sessionId",
  store: new store(), 
  maxAge: 5000
}))
app.use(koaBody({
  multipart: true
}))
app.use(router.routes()).use(router.allowedMethods())

 // 增加错误的监听处理
 app.on("error", (err, ctx) => {
   if (ctx && !ctx.headerSent && ctx.status < 500) {
     ctx.status = 500
   }
   if (ctx && ctx.log && ctx.log.error) {
     if (!ctx.state.logged) {
       ctx.log.error(err.stack)
     }
   }
 })

app.listen(config.port, () => {
  console.log(`Server start at http://127.0.0.1:${config.port}`)
})
