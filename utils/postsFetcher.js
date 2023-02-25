import matter from 'gray-matter'
import * as fs from 'fs'
import * as path from 'path'

export async function getAllPosts() {
  return Promise.all(getAllPostsSlugs().map(getSinglePost))
}

export async function getAllPostsByTag(tag) {
  return (await getAllPosts()).filter((singlePost) => singlePost.tags.includes(tag))
}

export function getAllPostsSlugs() {
  return fs.readdirSync(getPostsDirectory()).map(normalizePostName)
}

export async function getAllTags() {
  const allPosts = await getAllPosts()
  return [...new Set(allPosts.flatMap((singlePost) => singlePost.tags))].filter(Boolean)
}

function normalizeTags(tags) {
  return (
    tags
      ?.split(',')
      ?.map((single) => single.toLowerCase())
      ?.map((single) => single.trim()) || []
  )
}

function normalizePostName(postName) {
  return postName.replace('.mdx', '')
}

export async function getSinglePost(slug) {
  const filePath = path.join(getPostsDirectory(), slug + '.mdx')
  const contents = fs.readFileSync(filePath, 'utf8')

  const { data: meta, content } = matter(contents)
  const tags = normalizeTags(meta.tags)

  return { slug, content, meta, tags }
}

export function getPostsDirectory() {
  let basePath = process.cwd()
  return path.join(basePath, 'posts')
}
