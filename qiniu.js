const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('./config')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)
const uploadToQiniu = async (url, key) => {
  return new Promise((resolve, reject) => {
    client.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      }
      else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

