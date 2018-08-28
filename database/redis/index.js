const redisConn = require('./redis')
module.exports = class Redis {
  constructor() {
    this.redis = null
  }
  connToredis() { //创建连接对象
    return new Promise((resolve, reject) => {
      if (this.redis) {
        resolve(true) //已创建
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
  setCommand(id, data) { //增/改
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
  getCommand(id) { //查
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
// //调用上面的对象，实现redis操作
// let redisTest = new RedisTest() //实例对象
// redisTest.connToredis().then(resp => { //连接成功后，进行redis操作
//   if (resp) {
//     redisTest.setCommand(123456, {
//       name: 'feifeiyu'
//     }) //增
//     redisTest.getCommand(123456) //查
//     redisTest.setCommand(123456, {
//       name: 'feifeiyu3'
//     }) //改
//     redisTest.getCommand(123456) //查
//     redisTest.delCommand(123456) //删
//     redisTest.getCommand(123456) //差
//     redisTest.multiCommand(123457, {
//       name: 'feifeiyu2'
//     })
//   }
// }).catch(err => {
//   console.log('err', err)
// })
//https://feifeiyum.github.io/2016/09/18/node-koa2-web-datapersist/