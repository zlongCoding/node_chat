const mongoose = require("mongoose")
const config = require("../config")
const logger = require('../middleware/logger/logger')

// require("../models/user")
// require("../models/novelList")

module.exports = () => {
	const { db } = config

	if (config.env === 'development') {
		mongoose.set('debug', true)
	}

	mongoose.connect(db, {
		useNewUrlParser: true
	})

	mongoose.connection.on('disconnected', () => {
		mongoose.connect(db, {
			useNewUrlParser: true
		})
		logger({
			device: "db",
			dir: 'logs/db',
			deviceContent: `connect to mongodb disconnected `
		})
	})

	mongoose.connection.on('error', err => {
		logger({
			device: "db",
			dir: 'logs/db',
			deviceContent: `connect to mongodb fail ->${err}`
		  })
	})

	mongoose.connection.once('open', () => {
		logger({
			device: "db",
			dir: 'logs/db',
			deviceContent: `connect to mongodb success ->${db}`
		  })
	})
}
