const NovelModel = require('../models/novelList')

module.exports = class Novel {
  static createUser(username, password, restProps) {
    return NovelModel.create({ username, password, ...restProps })
  }
}