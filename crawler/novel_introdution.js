const puppeteer = require("puppeteer")

const url = "http://www.biquge.com.tw/19_19593/9313180.html"

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})


;(async() => {
  console.log("start visit the target page")

  const brower = await puppeteer.launch({
    args: ["--no--sandbox"],
    dumpio: false
  })

  const page = await brower.newPage()

  await page.goto(url, {
    waitUntil: "networkidle2"
  })
  const result = await page.evaluate(() => {
    var $ = window.$
    
    //  return $(items[1]).find("a").attr("href")
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
})()
