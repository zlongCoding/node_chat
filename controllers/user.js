const UserService = require('../service/user')
const bcrypt = require('bcryptjs');
const SALT_MAX = 10
class User {
    constructor() {
    }
  
    async _encryption(password) {
      const salt = await bcrypt.genSalt(SALT_MAX)
      const hash = await bcrypt.hash(password, salt)
      return hash
    }
 
  
 
   async signup(ctx) {
    const { username, password } = ctx.request.body
    // const code = await getRedis(mobile)

    // const bcryptPassword = await this._encryption(password)
    await UserService.createUser("153131", 3123123131, 3121)
  }
   
  
  
  }
  
  module.exports = new User()