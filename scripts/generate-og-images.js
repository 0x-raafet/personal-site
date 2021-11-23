require('isomorphic-fetch')

const matter = require('gray-matter')
const fs = require('fs')
const path = require('path')

;(async function () {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const snippetsDirectory = path.join(process.cwd(), 'snippets')

  const allPosts = getAllEntries(postsDirectory)
  const allSnippets = getAllEntries(snippetsDirectory)

  // prettier-ignore
  Promise.all([...allPosts, ...allSnippets]
    .map(([slug, directory]) => getSinglePost(slug, directory))
    .map(fetchImageBlob))
    .then(writeFilesToPublicDirectory)

  function getAllEntries(directory) {
    return fs
      .readdirSync(directory)
      .map(normalizePostName)
      .map((slug) => [slug, directory])
  }

  function normalizePostName(postName) {
    return postName.replace('.mdx', '')
  }

  function getSinglePost(slug, directory) {
    const filePath = path.join(directory, slug + '.mdx')
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
