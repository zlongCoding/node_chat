import { join } from 'path'
import mongoose from 'mongoose'
import glob from 'glob'
import config from '../../config'

mongoose.Promise = global.Promise

glob.sync(join(__dirname, '../database/schema', '**/*.js')).forEach(require)

export const database = app => {
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
