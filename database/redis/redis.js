const Redis = require('ioredis')
const config = require("../../config")
const logger = require('../../middleware/logger/logger')

//连接redis 
let redisConn = () => {
  let redis = new Redis({
    port: config.redis.port, // Redis port
    host: config.redis.host, // Redis host
    password: config.redis.password,
  })
  redis.on('connect', () => {
    callback_(null, redis)
    logger({
      device: "db",
      dir: 'logs/db',
      deviceContent: `connect to Redis connect success `
    })
  })
  redis.on('error', (err) => {
    logger({
      device: "db",
      dir: 'logs/db',
      deviceContent: `connect to Redis disconnected  -> ${err} `
    })
  })
}
module.exports = redisConn