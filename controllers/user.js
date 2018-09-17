const UserService = require('../models/user')
// const bcrypt = require('bcryptjs');
const SALT_MAX = 10
class User {
  constructor() {}

  _encryption(password) {
    // const salt =  bcrypt.genSalt(SALT_MAX)
    // const hash =  bcrypt.hash(password, salt)
    return "1111111"
  }

  async account(ctx) {
    let login = ctx.session.user ? true : false
    ctx.body = {
      msg: login,
      code: 200
    }
  }

  async register(ctx) {
    const {
      username,
      password
    } = ctx.request.body
    // const code = await getRedis(mobile)
    const user = await UserService.findOne({username: username}).exec()
    if (user) {
      ctx.body = {
        msg: "该用户名已被占用",
        code: 401
      }
    } else {
      let userObj = new UserService({
        username,
        password
      })
      console.log(ctx.session.user)
      ctx.session.user = username
      await userObj.save()
      ctx.body = {
        msg: "用户创建成功",
        code: 200
      }
    }
  }

  async login(ctx) {
     const {
       username,
       password
     } = ctx.request.body;
     const user = await UserService.findOne({username: username}).exec()
     if (user) {
      let codeCompare = await user.comparePassword(password, user.password)
      if (codeCompare) {
        console.log(ctx.session)
        console.log(ctx.session.user)
         ctx.session.user = username
         ctx.body = {
           msg: "登录成功",
           code: 200
         }
      } else {
        ctx.body = {
          msg: "密码错误",
          code: 405
        }
      }
     } else {
       ctx.body = {
         msg: "该用户不存在",
         code: 405
       }
     }
  }



}

module.exports = new User()