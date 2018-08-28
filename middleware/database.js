const mongoose = require('mongoose')
const config = require('../config')



module.exports = () => {
  let maConnecTimes = 0
  const { db } = config

  if (config.env === 'development') {
    mongoose.set('debug', true)
  }

  mongoose.connect(db)

  mongoose.connection.on('disconnected', () => {
    mongoose.connect(db)
  })

  mongoose.connection.on('error', err => {
    console.error(err)
  })

  mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB -> ', db)
  })
}
