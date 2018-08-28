const puppeteer = require("puppeteer")

const url = "http://www.biquge.com.tw/11_11850/"

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
  // await sleep(3000)
  const result = await page.evaluate(() => {
    var $ = window.$
    
    //  return $(items[1]).find("a").attr("href")
    var noval = {
      detail: {},
      list: []
    }
    noval.detail = {
      img: $("#fmimg img").attr("src"),
      info_title: $("#info").find("h1").text(),
      info_time: $($("#info").find("p").get(2)).text(),
      info_name: $($("#info").find("p").get(3)).text(),
      info_Introduction: $("#intro p").text()
    }
    var items = $("#list dd")
    if (items.length >= 1) {
      items.each((index,item) => {
        let  it = $(item)
        let linkUrl = it.find("a").attr("href")
        let novalName = it.find("a").text()
        noval.list.push({
          linkUrl,
          novalName,
        })
      })
    }
    return noval
  })
  brower.close()
  // console.log(result)
  // console.log(result.list)
  // console.log("==============")
  
  // let length = result.list.length / 200
  let length = Math.ceil(result.list.length / 100)
  for (let i = 0; i < length; i++) {
     process.send({
       detail: result.detail,
       list: result.list.slice(i * 100, 100 * (i + 1))
     })
  }
  setTimeout(() => {
    process.exit(0)
  }, 1500)
})()
