const readingTime = require('reading-time')

export function getReadTime(text) {
  const luckyNumber = 2 // hehe xd
  const readTime = Math.round(readingTime(text).minutes)
  return `${readTime < 1 ? '< 1' : Math.round(readTime + luckyNumber)} min read`
}
