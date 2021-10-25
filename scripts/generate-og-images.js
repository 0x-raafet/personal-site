require('isomorphic-fetch')

const matter = require('gray-matter')

;
const fs = require('fs')
const path = require('path')
(async function () {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const allPosts = fs.readdirSync(postsDirectory).map(normalizePostName)

  // prettier-ignore
  Promise.all(allPosts
    .map(getSinglePost)
    .map(fetchImageBlob))
    .then(writeFilesToPublicDirectory)

  function normalizePostName(postName) {
    return postName.replace('.mdx', '')
  }

  function getSinglePost(slug) {
    const filePath = path.join(postsDirectory, slug + '.mdx')
    const contents = fs.readFileSync(filePath, 'utf8')
    const { data: meta } = matter(contents)
    return [slug, meta]
  }

  async function fetchImageBlob([slug, { title, date }]) {
    return fetch(`https://blog-og-image-green.vercel.app/?title=${title}`).then((response) => {
      if (response.status >= 400) throw new Error(`Couldn't generate og:image`)
      return [slug, title, response.blob()]
    })
  }

  async function writeFilesToPublicDirectory(payloads) {
    for (const [slug, title, blob] of payloads) {
      const resolvedBlob = await blob
      const buffer = new Buffer.from(await resolvedBlob.arrayBuffer())
      const pathToWriteTo = path.join(process.cwd(), 'public', 'og-images')
      fs.writeFileSync(path.join(pathToWriteTo, slug + '.png'), buffer)
    }
  }
})()
