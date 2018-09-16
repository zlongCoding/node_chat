const routers = require("koa-router");
const router = routers();
// const Wxchat = require("../socket/weChat/wxChat");
const Chat = require("../socket/weChat");
const wechatUtils = require("../utils/weChat");
const QRCode = require('qrcode');
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
const sleep = time => new Promise(resolve => {
	setTimeout(resolve, time)
})
const chat = new Chat()
router.get('/wechat/qrcode', async (ctx, next) => {
	await chat.chatGetUUID().then(async res => {
		return ctx.body = res
	})

})

router.get("/wechat/list", async (ctx, next) => {
	await chat.chatCheckLogin().then(() => {
		return chat.chatinit()
	}).then(data => {
		let result = {
			user: data.User,
			ContactList: data.ContactList
		}
		ctx.body = result
	})
})

module.exports = router