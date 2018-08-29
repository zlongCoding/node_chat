const UserModel = require('../models/user')

module.exports = class User {
  static createUser(username, password, restProps) {
    return UserModel.create({ username, password, ...restProps })
  }
}