const koa = require('koa')
const koaBody = require('koa-body')
const bodyParser = require('koa-bodyparser');
const router = require('./router')
const logger = require('./middleware/logger')
const httpError = require('./middleware/httpError')
const cors = require('koa2-cors')
const config = require("./config")
const ip = require('ip')
const path = require("path")
const static = require('koa-static')
const session = require("koa-session2")
const email = require("./middleware/sendEmail")
const store = require("./database/session")
const loggers = require('./middleware/logger/logger')
// email()
const app = new koa()

app.use(static(path.resolve(__dirname, "./public")))
app.use(httpError({
  errorPageFolder: path.resolve(__dirname, './static/errHtml')
}))

// app.use(session({
//   key: "sessionId",
//   store: new store(),
//   maxAge: config.redis.maxAge
// }, app))

app.use(logger({
  env: app.env,
  projectName: 'koa2-loggers',
  appLogLevel: 'debug',
  dir: 'logs',
  serverIp: ip.address()
}))
app.use(cors())

require("./database/mongoose")()

app.use(koaBody({
  multipart: true
}))

app.use(router.routes()).use(router.allowedMethods())

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
  loggers({
    device: "server",
    dir: 'logs/db',
    deviceContent: `Server start at http://127.0.0.1:${config.port}`
  })
})