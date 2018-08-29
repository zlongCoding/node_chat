const redis = require('ioredis')
const uid = require('uid-safe')
class Store {
  constructor() {
    this.redis = new redis()
  }
  getId(length) {
    return uid.sync(length) 
  }
  get(sid) {
    return this.redis.get(`session-${sid}`).then((resp) => {
      try {
        return Promise.resolve(JSON.parse(resp))
      } catch (e) {
        return Promise.resolve({})
      }
    })
  }
  set(session, opts) {
    if (!opts.sid) {
      opts.sid = this.getId(24)
    }
    return this.redis.set(`session-${opts.sid}`, JSON.stringify(session)).then(() => {
      return Promise.resolve(opts.sid)
    })
  }
  destroy(sid) {
    return this.redis.del(`session-${sid}`)
  }
}
module.exports = Store