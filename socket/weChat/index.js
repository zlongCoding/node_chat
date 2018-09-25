const Wxchat = require("./wxChat")
// const QRCode = require('qrcode')
const EventEmitter = require('events');
const wechatUtils = require("../../utils/weChat");
const debug = require("debug")
// const wxchat = new Wxchat()
const _ = require("lodash")
const avatorImg = require("../../utils/http")
const qiniu = require("../../utils/qiniu")
class Chat extends Wxchat{
	constructor(props) {
		super(props)
		this.contacts = {} // 所有联系人
		console.log(this.COOKIE)
		// this.ajax = axiosUtils.wxAxios({
		// 	Cookie: this.COOKIE
		// })
	
	}
	start() {
		debug('启动中...')
		return this.chatLogin()
	}
	
	getAvatorImg(path, name) {
		let cookieText = Object.keys(this.COOKIE).map(key => {
				return `${key}=${this.COOKIE[key]}`
			}).join('; ')
		return avatorImg(path, name, cookieText).then((resolve) => {
			//  console.log(resolve)
      //  qiniu.stream(resolve, name)
			return resolve
		}, (reject) => {
			console.log(reject)
		})
	}
	getHeadImg(HeadImgUrl) {
		return Promise.resolve().then(() => {
			return this.ajax({
				method: 'GET',
				url: HeadImgUrl,
				responseType: 'arraybuffer'
			}).then(res => {
				// return {
				// 	data: res.data,
				// 	type: res.headers['content-type']
				// }
			})
		}).catch(err => {
			debug(err)
			err.tips = '获取头像失败'
			throw err
		})
	}


	chatinit() {
    return this.login().then((res) => {
      return res
			// return this.init().then(data => {
			// 	return data
			// 	// this.chatUpdateContacts(data.ContactList)
			// })
		}).catch(() => {

		})
	}
	chatCheckLogin() {
			return this.checkLogin()
				.then(res => {
					return res
				})
	}
	chatGetUUID() {
		return this.getUUID().then(async uuid => {
				return  wechatUtils.qrcode(`https://login.weixin.qq.com/l/${uuid}`).then(res => {
						return res
					})
		 	})
	}
	chatUpdateContacts(contacts) {
		if (!contacts || contacts.length == 0) {
			return
		}
		contacts.forEach(contact => {
			// if (this.contacts[contact.UserName]) {
			// 	let oldContact = this.contacts[contact.UserName]
			// 	for (let i in contact) {
			// 		contact[i] || delete contact[i]
			// 	}
			// 	Object.assign(oldContact, contact)
			// 	this.Contact.extend(oldContact)
			// } else {
			// 	this.contacts[contact.UserName] = this.Contact.extend(contact)
			// }
		})
		console.log(contacts)
		console.log(this.contacts)
	}
}


module.exports = Chat