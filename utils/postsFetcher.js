import * as path from 'path'
import * as fs from 'fs'
import matter from 'gray-matter'

const POSTS_DIRECTORY = path.join(process.cwd(), 'posts')

export async function getAllPosts() {
  return Promise.all(getAllPostsSlugs().map(getSinglePost))
}

export function getAllPostsSlugs() {
  return fs.readdirSync(POSTS_DIRECTORY).map(normalizePostName)
}

function normalizePostName(postName) {
  return postName.replace('.mdx', '')
}

export async function getSinglePost(slug) {
  const filePath = path.join(POSTS_DIRECTORY, slug + '.mdx')
  const contents = fs.readFileSync(filePath, 'utf8')
  const { data: meta, content } = matter(contents)

  return { slug, content, meta }
}
