
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
  }
}
module.exports = config