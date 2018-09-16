const UserModel = require('../models/user')

module.exports = class User {
  static createUser(username, password) {
    return UserModel.create({ username, password })
  }
}