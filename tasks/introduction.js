const cp = require('child_process')
const {
  resolve
} = require('path')

const NovelContent = require("../models/novelContent")
module.exports = (queryData) => {
  return new Promise((resolves, reject) => {
    let invoked = false
    let script = resolve(__dirname, '../crawler/novel_introdution.js')
    let child = cp.fork(script, [] )
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
    child.send(queryData)
    child.on('message', async data => {
      resolves(data)
     var a = await NovelContent.findOne({name: "圣墟"}).exec()
    if (a) {
      await NovelContent.updateOne({_id: a._id}, { $push: { content: data.result} }, { safe: true, upsert: true })
    } else {
      let comment = await new NovelContent({
        content: data.result,
        name: data.name,
      })
      await comment.save()
    }
    
  //    console.log(NovelContent.findOne({name: "圣墟1"},function(err, res){
  //     if (err) {
  //         console.log("Error:" + err);
  //     }
  //     else {
  //         console.log("Res:" + res);
  //     }
  // }))
      // NovelContent.create({
      //   name: data.name,
      //   content: data.result,
      //   // list: data.list,
      //   // img: `http://pe5tqbn4g.bkt.clouddn.com/${img.key}`,
      // })
    })
  })

  // child.send(movies)
}