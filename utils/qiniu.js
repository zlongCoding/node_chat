const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('./config')

const bucket = "novel"
const mac = new qiniu.auth.digest.Mac("0znCE1bxOVh0CSZidpuO0vXT3sFhJ8Zk-b5WGLIN", "RafgNKD3mo2TXVIEMK38p2PANSej4ZTVqESE9ES0")
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)
module.exports = async (url, key) => {
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

