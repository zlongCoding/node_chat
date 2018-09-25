var http = require("http");
var fs = require("fs");


module.exports = async (path, name, cookie) => {
  return new Promise((resolve, reject) =>{
    var options = {
      hostname: "wx.qq.com",
      port: 80,
      path: path,
      method: "GET",
      headers: {
        'Accept': 'text/html,applcation/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Cookie': cookie,
        'Host': 'wx.qq.com',
        // 'Referer':'https://wx.qq.com/?&lang=zh_CN',
        // "If-Modified-Since":"Fri, 11 Nov 2016 16:29:31 GMT",
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.110 Safari/537.36'
      }
    };
    var req = http.request(options, function (res) {
      if (res.statusCode !== 200) {
        console.log("status: " + res.statusCode);
        console.log("headers: " + JSON.stringify(res.headers));
      }
      var imgData = "";
      res.setEncoding("base64");
      // res.setEncoding("binary");
      res.on("data", function (chunk) {
        imgData += chunk
        // resolve(imgData)
      });
      res.on("end", function () {
        resolve(imgData)
        // fs.writeFile(name + ".jpg", imgData, "binary", function (err) {
        //   if (err) {
        //     reject("down fail");
        //   }
        //   // resolve("down success")
        // });
      })
    });
    req.on("error", function (e) {
      reject('error: ' + e.message)
    });
    req.end()
  })
    
  }
