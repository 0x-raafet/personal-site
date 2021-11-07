import matter from 'gray-matter'
import * as fs from 'fs'
import * as path from 'path'

export async function getAllSnippets() {
  return Promise.all(getAllSnippetsSlugs().map(getSingleSnippet))
}

export function getAllSnippetsSlugs() {
  return fs.readdirSync(getSnippetsDirectory()).map(normalizeSnippetName)
}

function normalizeSnippetName(snippetName) {
  return snippetName.replace('.mdx', '')
}

export async function getSingleSnippet(slug) {
  const filePath = path.join(getSnippetsDirectory(), slug + '.mdx')
  const contents = fs.readFileSync(filePath, 'utf8')
  const { data: meta, content } = matter(contents)

  return { slug, content, meta }
}

export function getSnippetsDirectory() {
  let basePath = process.cwd()
  return path.join(basePath, 'snippets')
}
