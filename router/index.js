const routers = require("koa-router")
const detail = require("../tasks/detail")
const router = routers()
const User = require("../controllers/user")
router.get('/', async (ctx, next) => {
  
  await detail().then((data) => {
    ctx.body = data
    // next()
  }, (data) => {
    console.log(data)
  })
})

router.get('/api', (ctx, next) => {
  ctx.session.view = !ctx.session.view ? 1 : ctx.session.view += 1   
  console.log(ctx.session.view)
     ctx.body = {
       code: 400
     }
})
/**
 * @api {get} /apis  测试
 * @apiDescription 测试
 * @apiName long
 * @apiGroup User
 * @apiParam {string} username 用户名
 * @apiParam {string} password 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/apis
 * @apiVersion 1.0.0
 */
router.get('/apis', User.signup)

module.exports =   router
