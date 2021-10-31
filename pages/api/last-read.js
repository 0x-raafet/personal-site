import chrome from 'chrome-aws-lambda'
import core from 'puppeteer-core'

export default async function Goodreads(req, res) {
  const chromeExecutable = await getChromiumExecutable()
  const { page } = await prepareWebPage(chromeExecutable)

  await page.goto('https://www.goodreads.com/user/show/125029202-bart-omiej-stefa-ski')

  res.setHeader('Cache-Control', `s-maxage=86400, stale-while-revalidate`)

  const results = await page.evaluate(() => {
    const currentlyReadingElement = document.querySelector('#currentlyReadingReviews')
    const bookTitle = currentlyReadingElement.querySelector('.bookTitle')
    const bookAuthor = currentlyReadingElement.querySelector('.authorName')
    return { bookTitle: bookTitle.textContent, bookAuthor: bookAuthor.textContent }
  })

  return res.send(results)
}

async function prepareWebPage(chromeExecutable) {
  const isProductionLikeMode = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging'

  const chromiumOptions = !isProductionLikeMode
    ? { args: [], executablePath: chromeExecutable.executable, headless: true }
    : {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }

  const browser = await core.launch(chromiumOptions)
  const newPage = await browser.newPage()
  await newPage.setViewport({ width: 1200, height: 630 })

  return { page: newPage }
}

function getChromiumExecutable() {
  const executable =
    process.platform === 'win32'
      ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
      : process.platform === 'linux'
      ? '/usr/bin/google-chrome'
      : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

  return { executable }
}
