const qiniu = require('qiniu')
const config = require('../config')
let Duplex = require('stream').Duplex;
const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK)
const cfg = new qiniu.conf.Config()
const client = new qiniu.rs.BucketManager(mac, cfg)


function bufferToStream(buffer) {
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}


var putPolicy = new qiniu.rs.PutPolicy({
  scope: config.qiniu.bucket,
});
var uploadToken = putPolicy.uploadToken(mac);
var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();


exports.utl = async (url, key) => {
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

exports.stream = async (readableStream, key) => {
  return new Promise((resolve, reject) => {
    // var bufferStream = new stream.PassThrough();
    // bufferStream.end(readableStream);

    formUploader.putFile(uploadToken, key + ".jpg", readableStream, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
         console.log(respErr);
      }
      console.log(respBody);
      // if (respInfo.statusCode == 200) {
      //   console.log(respBody);
      // } else {
      //   console.log(respBody);
      // }
    });
  })
}