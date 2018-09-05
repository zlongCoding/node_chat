const cp = require('child_process')
const {
  resolve
} = require('path')
const Novel = require("../models/novelList")
const qiniu = require("../utils/qiniu")
const introduction = require("./introduction")

module.exports = () => {
  return new Promise((resolves, reject) => {
    let invoked = false
    let script = resolve(__dirname, '../crawler/novel_detail.js')
    let child = cp.fork(script, [])
    child.on('error', err => {
      if (invoked) return
      invoked = true
      reject(err)
    })
    child.on('exit', code => {
      if (invoked) return
      invoked = true
      let err = code === 0 ? null : code
      reject(err)
    })
    child.on('message', async data => {
      resolves(data)
      const img = await qiniu(`http://www.biquge.com.tw${data.detail.img}`, data.detail.info_title)
      await Novel.create({
        name: data.detail.info_title,
        time: data.detail.info_time,
        content: data.detail.info_Introduction,
        list: data.list,
        img: `http://pe5tqbn4g.bkt.clouddn.com/${img.key}`,
      })
      let list = JSON.parse(data.list)
      // introduction({
      //   url: list[0].linkUrl,
      //   name: data.detail.info_title
      // })
      list.forEach((val, index)=>{
        (function(val, index){
          setTimeout(() => {
            introduction({
             url: val.linkUrl,
             name: data.detail.info_title
           })
          }, index * 500)
         })(val, index)
      })
    })
  })
  // child.send(movies)
}