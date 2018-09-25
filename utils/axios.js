const axios = require("axios")

const getPgv = c => {
  return (c || '') + Math.round(2147483647 * (Math.random() || 0.5)) * (+new Date() % 1E10)
}


exports.wxAxios = (defaults = {}) => {
  defaults.headers = defaults.headers || {}
  defaults.headers['user-agent'] = defaults.headers['user-agent'] || "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36";
  defaults.headers['connection'] = defaults.headers['connection'] || "close";

  defaults.timeout = 1000 * 60;
  defaults.httpAgent = false;
  defaults.httpsAgent = false;

  const instance = axios.create(defaults);
  this.Cookie = defaults.Cookie || {};
  // this.Cookie['pgv_pvi'] = getPgv();
    // this.Cookie['pgv_si'] = getPgv('s')
   console.log(this.Cookie)
   instance.interceptors.request.use(config => {
      config.headers['cookie'] = Object.keys(this.Cookie).map(key => {
        return `${key}=${this.Cookie[key]}`
      }).join('; ')
      return config
    }, err => {
      return Promise.reject(err)
    })
   instance.interceptors.response.use(res => {
      let setCookie = res.headers['set-cookie']
      if (setCookie) {
        setCookie.forEach(item => {
          let pm = item.match(/^(.+?)\s?\=\s?(.+?);/)
          if (pm) {
            this.Cookie[pm[1]] = pm[2]
          }
        })
      }
      return res
    }, err => {
      if (err && err.response) {
        delete err.response.request
        delete err.response.config
      }
      return Promise.reject(err)
    })
   const request = options => {
    return instance.request(options)
   }
   return request
}