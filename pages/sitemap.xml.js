import { EnvVars } from 'env'
import { getAllPosts, getAllPostsSlugs } from 'utils/postsFetcher'
import redirectToQuerylessUrl from 'utils/redirectToQuerylessUrl'
import withCacheEffectivePage from 'utils/withCacheEffectivePage'
import xmlescape from 'xml-escape'

export default function Sitemap() {}

export async function getServerSideProps(ctxt) {
  return withCacheEffectivePage(async ({ res }) => {
    res.write(mapToXmlFormat(await getAllPosts(), EnvVars.URL))
    res.end()
  })(ctxt)
}

function mapToXmlFormat(items, host) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${items.map((singleItem) => makeSingleSitemapItem(singleItem, host)).join('\n')}
  </urlset>
`
}

function makeSingleSitemapItem(post, host) {
  const {
    meta: { date, title, tags },
    slug,
  } = post
  const newsTitle = xmlescape(title) || ''

  return `<url>
  <loc>${host + slug}</loc>
  <news:news>
    <news:publication>
      <news:name>${host}</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>${date}</news:publication_date>
    <news:title>
      ${newsTitle}
    </news:title>
    <news:keywords><![CDATA[ ${xmlescape(tags)} ]]></news:keywords>
  </news:news>
</url>`
}
