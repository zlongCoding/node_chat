const Path = require('path')
const fs = require("fs")
const ejs = require('ejs')
module.exports = (opts = {}) => {
  const env = opts.env || process.env.NODE_ENV || 'development'

  const folder = opts.errorPageFolder
  const templatePath = Path.resolve(__dirname, '../../static/other.html')
  let fileName = 'other'
  return async (ctx, next) => {
    try {
      await next()
      if (ctx.response.status === 404 && !ctx.response.body) ctx.throw(404);
    } catch (e) {
      let status = parseInt(e.status)
      const message = e.message
      if (status >= 400) {
        switch (status) {
          case 400:
          case 404:
          case 500:
            fileName = status;
            break;
          default:
            fileName = 'other'
        }
      } else {
        status = 500
        fileName = status
      }
      const filePath = folder ? Path.join(folder, `${fileName}.html`) : templatePath

      try {
        await ejs.renderFile(filePath, {
              env: env,
              status: e.status || e.message, 
              error: e.message,
              stack: e.stack
            }, {}, (err, str) => {
          ctx.status = status
          ctx.body = str
        });
      } catch (e) {
        ctx.throw(500, `错误页渲染失败:${e.message}`)
      }
    }
  }
}