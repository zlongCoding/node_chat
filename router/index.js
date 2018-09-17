const compose = require('koa-compose')
const glob = require('glob')

const {
  resolve
} = require('path')

// app.all("*", function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT,OPTIONS,HEAD,FETCH");
//     next();
// })


registerRouter = () => {
  let routers = [];
  glob.sync(resolve(__dirname, './*.js'))
    .filter(value => (value.indexOf('index.js') === -1))
    .map(router => {
      routers.push(require(router).routes())
      routers.push(require(router).allowedMethods())
    })
  return compose(routers)
}

module.exports = registerRouter