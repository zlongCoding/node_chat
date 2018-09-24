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

const qiniu = require("../utils/qiniu")
const chat = new Chat()
router.get('/wechat/qrcode', async (ctx, next) => {
	await chat.chatGetUUID().then(async res => {
		return ctx.body = res
	})

})
// const sleep = time => new Promise(resolve => {
// 	setTimeout(resolve, time)
// })


router.get("/wechat/checklogin", async (ctx, next) => {

	await chat.chatCheckLogin().then((res) => {
		console.log(res)
		ctx.body = res
		if (res.code === 201 && res.userAvatar) {
			return res
			// this.emit('user-avatar', res.userAvatar)
		}
		if (res.code !== 200) {
			return chat.chatCheckLogin()
		} else {
			return res
		}
	})
})

router.get("/wechat/account", async (ctx, next) => {
	await chat.chatinit().then(data => {
		let result
		if (data) {
			result = {
				user: data.User,
				ContactList: data.ContactList
			}
		} else {
			result = {
				user: {},
				ContactList: []
			}
		}
		console.log(result)
		ctx.body = result
	})
})

router.get("/wechat/login", async (ctx, next) => {
	await chat.login().then(res => {
		console.log(ctx.cookies.get("pgv_si"))
		let options = {
			maxAge: 60 * 60 * 60 * 12 * 7, //cookie有效时长，单位：毫秒数
			expires: new Date('2018-10-1'),
			domain: "localhost", //cookie可用域名，“.”开头支持顶级域名下的所有子域名
			httpOnly: false, //true，客户端不可读取
			overwrite: false //一个布尔值，表示是否覆盖以前设置的同名的 cookie (默认是 false). 如果是 true, 在同一个请求中设置相同名称的所有 Cookie（不管路径或域）是否在设置此Cookie 时从 Set-Cookie 标头中过滤掉。
		}

		if (res.config) {
			ctx.cookies.set("pgv_pvi", res.config.Cookie.pgv_pvi, options)
			ctx.cookies.set("pgv_si", res.config.Cookie.pgv_si, options)
			ctx.cookies.set("wxuin", res.config.Cookie.wxuin, options)
			ctx.cookies.set("wxsid", res.config.Cookie.wxsid, options)
			ctx.cookies.set("wxloadtime", res.config.Cookie.wxloadtime, options)
			ctx.cookies.set("mm_lang", res.config.Cookie.mm_lang, options)
			ctx.cookies.set("webwx_data_ticket", res.config.Cookie.webwx_data_ticket, options)
			ctx.cookies.set("webwxuvid", res.config.Cookie.webwxuvid, options)
			ctx.cookies.set("webwx_auth_ticket", res.config.Cookie.webwx_auth_ticket, options)
			ctx.cookies.set("MM_WX_NOTIFY_STATE", 1, options)
			ctx.cookies.set("MM_WX_SOUND_STATE", 1, options)
		}
		console.log(res.config)

		// ctx.cookies.set("webwx_auth_ticket", res.config.Cookie.webwx_auth_ticket, options)

		ctx.body = {
			msg: "设置成功",
			code: 200
		}
	})
})
router.get("/wechat/init", async (ctx, next) => {

	console.log(ctx.cookies.get("pgv_si"))
	await chat.init().then(data => {

		console.log(data)
		ctx.body = data
	})
})

router.get("/wechat/contact", async (ctx, next) => {

	await chat.getWxcontact().then(data => {
		ctx.body = data
	})
})

// router.get("/wechat/img", async (ctx, next) => {

// 	console.log(ctx.query)
// 	const img = await qiniu(`https://wx2.qq.com${ctx.query.img}`, "1111")

// 	ctx.body = {
// 		img: `http://pe5tqbn4g.bkt.clouddn.com/${img.key}`
// 	}
// })

module.exports = router