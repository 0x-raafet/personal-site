import matter from 'gray-matter'
import * as fs from 'fs'
import * as path from 'path'
import { getReadTime } from './getReadTime'

export async function getSimilarPosts(slug, count = 3) {
  const { tags } = await getSinglePost(slug)
  const allPosts = await getAllPosts()

  const postsWithSimilarTags = allPosts.map((singlePost) => {
    const similaritiesCount = singlePost.tags.filter((singleTag) => tags.includes(singleTag)).length
    return { ...singlePost, similaritiesCount }
  })
  return [
    ...postsWithSimilarTags
      .filter((singlePost) => singlePost.slug !== slug)
      .sort((a, b) => b.similaritiesCount - a.similaritiesCount)
      .map(({ content, similaritiesCount, ...rest }) => ({ ...rest, readTime: getReadTime(content) })),
    ...allPosts,
  ].slice(0, count)
}

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
  const tagsArticlesCount = allPosts
    .flatMap((singlePost) => singlePost.tags)
    .filter(Boolean)
    .reduce((prev, curr) => ({ ...prev, [curr]: (prev[curr] || 0) + 1 }), {})

  return Object.entries(tagsArticlesCount)
    .sort(([keyA, valueA], [keyB, valueB]) => valueB - valueA)
    .flatMap((v) => v)
    .filter((v) => typeof v === 'string')
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
  return path.join(process.cwd(), 'posts')
}
