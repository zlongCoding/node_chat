const ioredis = require('ioredis')
const config = require("../../config")

//连接redis 
let clientCreate = (config, callback_) => {
  let redis = new ioredis(config)
  redis.on('connect', () => { 
    callback_(null, redis)
  })
  redis.on('error', (err) => {
    callback_(err, null)
  })
}
let redisConn = (options) => {
  let option = options || config.redis
  return new Promise((resolve, reject) => { 
    clientCreate(option, (err, conn) => {
      if (err) {
        reject(err)
      }
      resolve(conn)
    })
  })
}
module.exports = redisConn