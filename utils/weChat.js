const QRCode = require('qrcode');

module.exports = {
  qrcode (url){
  	return new Promise((res, rej) => {
      QRCode.toDataURL(url, (err, code) =>{
  	  	res(code)
      })
  	})
  },
   getDeviceID () {
     return 'e' + ('' + Math.random().toFixed(15)).substring(2, 17)
   }
}

