const Wxchat = require("./wxChat")
// const QRCode = require('qrcode')
const EventEmitter = require('events');
const wechatUtils = require("../../utils/weChat");
const debug = require("debug")
// const wxchat = new Wxchat()
const _ = require("lodash")
class Chat extends Wxchat{
	constructor(props) {
		super(props)
		this.contacts = {} // 所有联系人
	}
	start() {
		debug('启动中...')
		return this.chatLogin()
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