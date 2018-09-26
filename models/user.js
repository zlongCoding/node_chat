const mongoose = require('mongoose')
// const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createdAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

UserSchema.pre('save', function (next) {
  let user = this

  // bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
  //   if (err) return next(err)

  //   bcrypt.hash(user.password, salt, (error, hash) => {
  //     if (error) return next(error)

  //     user.password = hash
  //     next()
  //   })
  // })
})




UserSchema.methods = {
  comparePassword: function (_password, password) {
    return new Promise((resolve, reject) => {
      // bcrypt.compare(_password, password, function (err, isMatch) {
      //   if (!err) resolve(isMatch)
      //   else reject(err)
      // })
    })
  }
}

module.exports = mongoose.model('User', UserSchema)