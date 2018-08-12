const puppeteer = require("puppeteer")

const url = "http://www.biquge.com.tw/"

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
    var items = $("#hotcontent .item")
    var novalHot = []
    if (items.length >= 1) {
      items.each((index,item) => {
        let  it = $(item)
        let linkUrl = it.find("a").attr("href")
        let linkImg = it.find("img").attr('src')
        let novalName = it.find("dt a").text()
        let author = it.find("dt span").text()
        let Introduction = it.find("dd").text()
        novalHot.push({
          linkUrl,
          linkImg,
          novalName,
          author,
          Introduction
        })
      })
    }
    return novalHot
  })

  brower.close()

  process.send({result})
  process.exit(0)
})()
