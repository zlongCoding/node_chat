const redisConn = require('./redis')
class Redis {
  constructor() {
    this.redis = null
  }
  connToredis() {
    return new Promise((resolve, reject) => {
      if (this.redis) {
        resolve(true)
      } else {
        redisConn().then(resp => {
          this.redis = resp
          resolve(true)
        }).catch(err => {
          reject(err)
        })
      }
    })
  }
  setCommand(id, data) {
    if (expire === null || expire === undefined) {
      this.redis.set(`test-${id}`, JSON.stringify(data)).then(resp => {
        console.log('set', resp)
      }).catch(err => {
        console.log('err', err)
      })
    } else {
      this.redis.set(`test-${id}`, JSON.stringify(data), 'ex', expire).then(resp => { //ex 为过期时间，单位为 秒
        console.log('set', resp)
      }).catch(err => {
        console.log('err', err)
      })
    }
  }
  getCommand(id) {
    this.redis.get(`test-${id}`).then(resp => {
      console.log('get', resp)
    }).catch(err => {
      console.log('err', err)
    })
  }
  delCommand(id) {
    this.redis.del(`test-${id}`).then(resp => {
      console.log('resp', resp)
    })
  }
  multiCommand(id, data) {
    this.redis.multi().set(`test-${id}`, JSON.stringify(data))
      .get(`test-${id}`).exec((err, resp) => {
        if (err) {
          console.log('err', err)
        } else {
          console.log('resp', resp)
        }
      })
  }
}

module.exports = new Redis()