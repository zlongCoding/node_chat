const cp = require('child_process')
const { resolve } = require('path')


;(async () => {
  let invoked = false
  let script = resolve(__dirname, '../crawler/novel_update.js')
  let child = cp.fork(script, [])

  child.on('error', err => {
    if (invoked) return
    invoked = true
    
    console.log(err)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true
    let err = code === 0 ? null : new Error('exit code ' + code)
    
    console.log(err)
  })

  child.on('message', data => {
    console.log(data)
  })

  // child.send(movies)
})()
  