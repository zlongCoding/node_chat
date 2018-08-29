
const config = {
  db: 'mongodb://localhost/noval-trailer',
  port: 3000,
  base: "http://localhost:3000",
  qiniu: {
    bucket: 'yourbucket',
    video: 'http://yourvideourl.xxx.com/',
    AK: '-dLG8KAfxx',
    SK: 'wcgqiwkL7xxx'
  },
  redis: {
    port: 6379,
    host: '127.0.0.1',
    maxAge: 3600 * 60 * 24 * 7
  },
  email: {
    platform: "163",
    user: "zhanglong_hn@163.com",
    pass: "zhanglong163"
  },
  db: 'mongodb://127.0.0.1:27017/novel',
}
module.exports = config