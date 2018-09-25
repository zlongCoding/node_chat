const wxChatConfig = require("../../utils/chatConfig")
const globals = require("../../utils/global")
const axiosUtils = require("../../utils/axios")
const wechatUtils = require("../../utils/weChat")


module.exports = class Wxchat {
  constructor(props) {
    this.credentials = {
      rediUrl: "",
      uin: '',
      sid: '',
      skey: '',
      passTicket: '',
      formatedSyncKey: '',
      webwxDataTicket: '',
      syncKey: {
        List: []
      }
    }
    this.user = {}
    this.COOKIE = {}
    this.axios = axiosUtils.wxAxios({
      Cookie: this.COOKIE
    })
  }

  getUUID() {
    return Promise.resolve().then(() => {
      return this.axios({
        method: 'POST',
        url: wxChatConfig.API_jsLogin
      }).then(res => {
        let uuid = /window.QRLogin.uuid\s*=\s*"(.*)";/g.exec(res.data)[1]
        this.credentials.uuid = uuid
        return uuid
      })
    })

  }
  checkLogin() {
    return Promise.resolve().then(() => {
      return this.axios({
        method: 'GET',
        url: wxChatConfig.API_login,
        params: {
          "loginicon": true,
          "uuid": this.credentials.uuid,
          "tip": 0,
          "r": ~new Date,
        }
      }).then(res => {
        let result = {
          code: Number(res.data.match(/window.code=(\d+);/)[1])
        }
        if (result.code === 200) {
          this.credentials.rediUrl = res.data.match(/window.redirect_uri="(.*)"/)[1]
          return result
        } else {
          return result
        }
      })
    })

  }
  login() {
    return Promise.resolve().then(() => {
      return this.axios({
        method: 'GET',
        url: this.credentials.rediUrl + "&fun=new&version=v2",
      }).then(res => {
        // ctx.cookies.set("pgv_pvi", res.config.Cookie.pgv_pvi, options)
        // ctx.cookies.set("pgv_si", res.config.Cookie.pgv_si, options)
        // ctx.cookies.set("wxuin", res.config.Cookie.wxuin, options)
        // ctx.cookies.set("wxsid", res.config.Cookie.wxsid, options)
        // ctx.cookies.set("wxloadtime", res.config.Cookie.wxloadtime, options)
        // ctx.cookies.set("mm_lang", res.config.Cookie.mm_lang, options)
        // ctx.cookies.set("webwx_data_ticket", res.config.Cookie.webwx_data_ticket, options)
        // ctx.cookies.set("webwxuvid", res.config.Cookie.webwxuvid, options)
        // ctx.cookies.set("webwx_auth_ticket", res.config.Cookie.webwx_auth_ticket, options)
        // ctx.cookies.set("MM_WX_NOTIFY_STATE", 1, options)
        // ctx.cookies.set("MM_WX_SOUND_STATE", 1, options)
        if (res.config) {
          this.COOKIE = {
            webwxuvid: res.config.Cookie.webwxuvid,
            wxuin: res.config.Cookie.wxuin,
            wxsid: res.config.Cookie.wxsid,
            webwx_data_ticket: res.config.Cookie.webwx_data_ticket,
            webwx_auth_ticket: res.config.Cookie.webwx_auth_ticket,
            wxloadtime: res.config.Cookie.wxloadtime,
          }
        }

        let result = res.data.match(/<ret>(.*)<\/ret>/);

        if (result && result[1] === '0') {
          this.credentials.skey = res.data.match(/<skey>(.*)<\/skey>/)[1]
          this.credentials.sid = res.data.match(/<wxsid>(.*)<\/wxsid>/)[1]
          this.credentials.uin = res.data.match(/<wxuin>(.*)<\/wxuin>/)[1]
          this.credentials.passTicket = res.data.match(/<pass_ticket>(.*)<\/pass_ticket>/)[1]
        }
        if (res.headers['set-cookie']) {
          res.headers['set-cookie'].forEach(item => {
            if (/webwx.*?data.*?ticket/i.test(item)) {
              this.credentials.webwxDataTicket = item.match(/=(.*?);/)[1]
            } else if (/wxuin/i.test(item)) {
              this.credentials.uin = item.match(/=(.*?);/)[1]
            } else if (/wxsid/i.test(item)) {
              this.credentials.sid = item.match(/=(.*?);/)[1]
            }
          })
        }
        return result
      })
    })
  }
  init() {
    return Promise.resolve().then(() => {
      let params = {
        'pass_ticket': this.credentials.passTicket,
        'skey': this.credentials.skey,
        'r': ~new Date()
      }
      let data = {
        BaseRequest: this.getBaseRequest()
      }
      return this.axios({
        method: 'POST',
        url: wxChatConfig.API_webwxinit,
        params: params,
        data: data
      }).then(res => {
        let data = res.data
        // this.credentials.skey = data.SKey || this.credentials.skey
        // this.updateSyncKey(data)
        // Object.assign(this.user, data.User)
        return data
      })
    }).catch(err => {
      throw err
    })
  }
  updateSyncKey(data) {

  }
  getWxcontact(seq) {
    return Promise.resolve().then(() => {
      return this.axios({
        method: 'POST',
        url: wxChatConfig.API_webwxcontact,
        params: {
          'lang': 'zh_CN',
          'pass_ticket': this.credentials.passTicket,
          'seq': 0,
          'skey': this.credentials.skey,
          'r': +new Date()
        }
      }).then(res => {
        return res.data
      })
    })
  }
  getBaseRequest() {
    return {
      Uin: parseInt(this.credentials.uin),
      Sid: this.credentials.sid,
      Skey: this.credentials.skey,
      DeviceID: wechatUtils.getDeviceID()
    }
  }
}