const Redis = require('ioredis')
const {
  Store
} = require("koa-session2");
const uid = require('uid-safe')
const config = require("../config")
class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis({
      port: config.redis.port,
      host: config.redis.host,
      password: config.redis.password,
    });
  }

  async get(sid, ctx) {
    let data = await this.redis.get(`chat:${sid}`);
    return JSON.parse(data);
  }

  async set(session, {
    sid = this.getID(24),
    maxAge = 1000000
  } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(`chat:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
    } catch (e) {}
    return sid;
  }

  async destroy(sid, ctx) {
    return await this.redis.del(`chat:${sid}`);
  }
}

module.exports = RedisStore;