import CryptoJS from 'crypto-js'
import { google } from 'googleapis'
import _fetch from 'isomorphic-fetch'
import uniqBy from 'lodash/uniqBy'
import { EnvVars } from 'env'
import { googlePrivateKey } from 'secrets/google-private-key'
import { getAllPosts } from 'utils/postsFetcher'

export default async function PostsEndpoint(req, res) {
  res.setHeader('Cache-Control', `s-maxage=600, stale-while-revalidate`)

  try {
    const allPosts = await getAllPosts()
    const pagesViews = await getAnalyticsAllPagesViews()
    const pagesViewsForem = await getArticlesViewsFromForem(allPosts)
    const allPostsSlugs = allPosts.map((post) => post.slug)
    return res.send({
      posts: pagesViews
        .filter((view) => allPostsSlugs.includes(view.slug))
        .map((prev) => ({ ...prev, views: `${Number(prev.views) + Number(pagesViewsForem[prev.slug])}` })),
    })
  } catch (e) {
    console.error(e)
    res.send({ posts: [] })
  }
}

async function getAnalyticsAllPagesViews() {
  const jwt = createJwtToken()
  await jwt.authorize()
  const analytics = google.analytics('v3')
  const result = await analytics.data.ga.get({
    auth: jwt,
    ids: 'ga:' + EnvVars.GA_VIEW_ID,
    'start-date': '2019-01-01',
    'end-date': 'today',
    'max-results': 1000,
    metrics: 'ga:pageviews',
    dimensions: 'ga:pagePath',
    filters: 'ga:pagePath!@?', // does not contain question mark
    'include-empty-rows': false,
    sort: '-ga:pageviews', // descending
  })

  if (result.data.rows) {
    const parsedResult = result.data.rows.map((singleRow) => ({
      slug: sanitizeSlug(singleRow[0]),
      views: singleRow[1],
    }))
    return uniqBy(parsedResult, (r) => r.slug).sort((a, b) => +a.views - +b.views)
  }

  return []
}

async function getArticlesViewsFromForem(allPosts) {
  return _fetch('https://dev.to/api/articles/me/published', { headers: { 'api-key': EnvVars.FOREM_API_KEY } })
    .then((res) => res.json())
    .then((foremPosts) =>
      allPosts.map((localPost) => ({
        [localPost.slug]: foremPosts.find((foremPost) => foremPost.slug === localPost.meta.foremSlug)?.page_views_count || 0,
      })),
    )
    .then((data) => convertKeyValToObject(data))
}

function convertKeyValToObject(array) {
  return array.reduce((result, item) => {
    const key = Object.keys(item)[0]
    result[key] = item[key]
    return result
  }, {})
}

function sanitizeSlug(slug) {
  if (slug.includes('/snippets/')) {
    const snippetsAwareSlug = slug.replace('/snippets', '')
    return sanitizeSlug(snippetsAwareSlug)
  }

  const slashLessSlug = slug.slice(1)
  const questionMarkIdx = slashLessSlug.indexOf('?')
  return removeAfterSlashPart(slashLessSlug.slice(0, questionMarkIdx === -1 ? slashLessSlug.length : questionMarkIdx))
}

function removeAfterSlashPart(value) {
  const slashIdx = value.indexOf('/')
  return value.slice(0, slashIdx === -1 ? value.length : slashIdx)
}

function createJwtToken() {
  const scopes = 'https://www.googleapis.com/auth/analytics.readonly'
  return new google.auth.JWT(
    process.env.ANALYTICS_EMAIL,
    undefined,
    replaceEscapeSequenceWithLineBreak(getPrivateKeyFileContents()),
    scopes,
  )
}

function replaceEscapeSequenceWithLineBreak(v) {
  return v.replace(/\\n/gm, '\n')
}

function getPrivateKeyFileContents() {
  const bytes = CryptoJS.AES.decrypt(googlePrivateKey, EnvVars.GOOGLE_PRIVATE_KEY_PASS)
  return bytes.toString(CryptoJS.enc.Utf8)
}
