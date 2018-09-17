
const config = {
  port: 3001,
  qiniu: {
    bucket: 'novel',
    video: 'http://pe5tqbn4g.bkt.clouddn.com/',
    AK: '0znCE1bxOVh0CSZidpuO0vXT3sFhJ8Zk-b5WGLIN',
    SK: 'RafgNKD3mo2TXVIEMK38p2PANSej4ZTVqESE9ES0'
  },
  redis: {
    port: 6379,
    host: '118.126.82.217',
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  email: {
    platform: "163",
    user: "zhanglong_hn@163.com",
    pass: "zhanglong163"
  },
  db: 'mongodb://118.126.82.217:27117/chat',
}
module.exports = config