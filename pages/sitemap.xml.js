import { withCacheEffectivePage } from 'next-cache-effective-pages'
import * as xml from 'xml'
import xmlescape from 'xml-escape'
import { EnvVars } from 'env'
import { getAllPosts } from 'utils/postsFetcher'

export default function Sitemap() {}

export async function getServerSideProps(ctxt) {
  return withCacheEffectivePage(async ({ res }) => {
    res.write(mapToXmlFormat(await getAllPosts(), EnvVars.URL))
    res.end()
  })(ctxt)
}

function mapToXmlFormat(items, host) {
  return xml(
    [
      {
        urlset: [
          {
            _attr: {
              xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
              'xmlns:news': 'http://www.google.com/schemas/sitemap-news/0.9',
            },
          },
          ...items.map((singleItem) => makeSingleSitemapItem(singleItem, host)),
        ],
      },
    ],
    { declaration: true, indent: '\t' },
  )
}

function makeSingleSitemapItem(post, host) {
  const {
    meta: { date, title, tags },
    slug,
  } = post
  const newsTitle = xmlescape(title) || ''

  return {
    url: [
      { loc: host + slug },
      {
        'news:news': [
          { 'news:publication': [{ 'news:name': host }, { 'news:language': 'en' }] },
          { 'news:publication_date': date },
          { 'news:title': newsTitle },
          { 'news:keywords': { _cdata: tags } },
        ],
      },
    ],
  }
}
