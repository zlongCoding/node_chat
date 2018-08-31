const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  time: String,
  content: Object,
  list: Array,
  introduction: String,
  img: String,
  newName: String,
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

module.exports = mongoose.model('User', UserSchema)

