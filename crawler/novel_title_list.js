// const axios = require("axios")

// axios.get("http://www.biquge.com.tw/quanben/").then(data => {
//   console.log(data)
// }).catch(err => {
//   console.log(err)
// })


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
    var items = $(".nav a")
    var linksArr = []

    if (items.length >= 1) {
      items.each((index,item) => {
        let  it = $(item)
        let linkUrl = it.attr("href")
        let linkText = it.text()
        linksArr.push({
          linkUrl,
          linkText
        })
      })
    }
    return linksArr
  })

  brower.close()

  process.send({result})
  process.exit(0)
})()
