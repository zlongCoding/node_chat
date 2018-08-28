const routers = require("koa-router")
const detail = require("../tasks/detail")
const router = routers()
router.get('/', async (ctx, next) => {
  await detail().then((data) => {
    ctx.body = data
    // next()
  }, (data) => {
    console.log(data)
  })
})
/**
 * @api {get} /api  测试
 * @apiDescription 测试
 * @apiName submit-login
 * @apiGroup User
 * @apiParam {string} loginName 用户名
 * @apiParam {string} loginPass 密码
 * @apiSuccess {json} result
 * @apiSuccessExample {json} Success-Response:
 *  {
 *      "success" : "true",
 *      "result" : {
 *          "name" : "loginName",
 *          "password" : "loginPass"
 *      }
 *  }
 * @apiSampleRequest http://localhost:3000/api/user/submit-login
 * @apiVersion 1.0.0
 */
router.get('/api', (ctx, next) => {
  ctx.body = "1111111111"
})


module.exports =   router
