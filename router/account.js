const routers = require("koa-router");
const router = routers();
const User = require("../controllers/user");

router.post('/account/login', User.login);
router.post('/account/register', User.register);

module.exports = router;