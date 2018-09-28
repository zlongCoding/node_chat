
let host = "https://wx.qq.com",
    loginUrl = "login.weixin.qq.com",
    fileUrl = "file.wx.qq.com",
    webUrl = "webpush.weixin.qq.com";

module.exports = {
	LANG: "zh_CN",
	EMOTICON_REG: 'img\\sclass="(qq)?emoji (qq)?emoji([\\da-f]*?)"\\s(text="[^<>(\\s]*")?\\s?src="[^<>(\\s]*"\\s*',
	RES_PATH: "/zh_CN/htmledition/v2/",
	API_jsLogin: "https://" + loginUrl + "/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https%3A%2F%2Fwx.qq.com%2Fcgi-bin%2Fmmwebwx-bin%2Fwebwxnewloginpage&fun=new&lang=zh_CN",
	API_login: "https://" + loginUrl + "/cgi-bin/mmwebwx-bin/login",
	API_rediUrl: "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage",
	API_synccheck: "https://" + webUrl + "/cgi-bin/mmwebwx-bin/synccheck",
	API_webwxdownloadmedia: "https://" + fileUrl + "/cgi-bin/mmwebwx-bin/webwxgetmedia",
	API_webwxuploadmedia: "https://" + fileUrl + "/cgi-bin/mmwebwx-bin/webwxuploadmedia",
	API_webwxpreview: host +  "/cgi-bin/mmwebwx-bin/webwxpreview",
	API_webwxinit: host +  "/cgi-bin/mmwebwx-bin/webwxinit",
	API_webwxcontact: host + '/cgi-bin/mmwebwx-bin/webwxgetcontact',
	API_webwxsync: host +  "/cgi-bin/mmwebwx-bin/webwxsync",
}