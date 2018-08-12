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
    var items = $("#newscontent li")
    //  return $(items[1]).find("a").attr("href")
    var novalUpdate = []
    if (items.length >= 1) {
      items.each((index,item) => {
        let  it = $(item)
        let linkUrl = it.find(".s2 a").attr("href")
        let novalName = it.find(".s2 a").text()
        let sectionUrl = it.find(".s3 a").attr('href')
        let sectionText = it.find(".s3 a").text()
        let author = it.find(".s5").text()
        novalUpdate.push({
          linkUrl,
          sectionUrl,
          novalName,
          author,
          sectionText
        })
      })
    }
    return novalUpdate
  })

  brower.close()

  process.send({result})
  process.exit(0)
})()
