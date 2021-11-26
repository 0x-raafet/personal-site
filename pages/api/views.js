import CryptoJS from 'crypto-js'
import { google } from 'googleapis'
import uniqBy from 'lodash/uniqBy'
import * as fs from 'fs'
import * as path from 'path'
import { EnvVars } from 'env'
import { googlePrivateKey } from 'secrets/google-private-key'
import { getAllPostsSlugs } from 'utils/postsFetcher'
import { getAllSnippetsSlugs } from 'utils/snippetsFetcher'

export default async function PostsEndpoint(req, res) {
  res.setHeader('Cache-Control', `s-maxage=600, stale-while-revalidate`)
  try {
    const pagesViews = await getAnalyticsAllPagesViews()
    const allPostsSlugs = getAllPostsSlugs()
    const allSnippetsSlugs = getAllSnippetsSlugs()

    return res.send({
      posts: pagesViews.filter((view) => allPostsSlugs.includes(view.slug)),
      snippets: pagesViews.filter((view) => allSnippetsSlugs.includes(view.slug)),
    })
  } catch {
    res.send({ posts: [], snippets: [] })
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
