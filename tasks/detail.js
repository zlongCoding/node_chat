const cp = require('child_process')
const { resolve } = require('path')


module.exports =  () => {
  return new Promise((resovle, reject) => {
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
      let err = code === 0 ? null :  code
      reject(err)
    })
    child.on('message', data => {
      resovle(data)
    })
  })
  // child.send(movies)
}

  
