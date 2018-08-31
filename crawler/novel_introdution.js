const puppeteer = require("puppeteer")

// const url = "http://www.biquge.com.tw/19_19593/9313180.html"

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async() => {
  process.on("message", async function(msg) {
    let url = msg.url
    const brower = await puppeteer.launch({
      args: ["--no--sandbox"],
      dumpio: false
    })
  
    const page = await brower.newPage()
  
    await page.goto(`http://www.biquge.com.tw${url}`, {
      waitUntil: "networkidle2"
    })
    const result = await page.evaluate(() => {
      var $ = window.$
      var noval = {
        content: $("#content").html(),
        title: $(".bookname h1").text(),
        previous_chapter: $($(".bottem1 a").get(1)).attr("href"),
        next_chapter: $($(".bottem1 a").get(3)).attr("href")
      }
      return noval
    })
  
    brower.close()
    
    process.send({result})
    process.exit(0)
  })
})()
