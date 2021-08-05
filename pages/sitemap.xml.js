import { EnvVars } from 'env'
import { getAllPosts, getAllPostsSlugs } from 'utils/postsFetcher'
import xmlescape from 'xml-escape'

export default function Sitemap() {}

export async function getServerSideProps({ res, req, query }) {
  const hasForbiddenQueryParams = Object.keys(query).length > 1
  if (hasForbiddenQueryParams) {
    return redirectToQuerylessUrl(req)
  }

  const secondsBeforeRevalidation = 60 * 30
  res.setHeader('Cache-Control', `s-maxage=${secondsBeforeRevalidation}, stale-while-revalidate`)
  res.setHeader('Content-Disposition', 'inline')
  res.setHeader('Content-Type', 'text/xml')

  res.write(mapToXmlFormat(await getAllPosts(), EnvVars.URL))
  res.end()
  return { props: {} }
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
  const pubDate = new Date(date).toUTCString()
  const newsTitle = xmlescape(title) || ''

  return `<url>
  <loc>${host + slug}</loc>
  <news:news>
    <news:publication>
      <news:name>${host}</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>${pubDate}</news:publication_date>
    <news:title>
      ${newsTitle}
    </news:title>
    <news:keywords><![CDATA[ ${xmlescape(tags)} ]]></news:keywords>
  </news:news>
</url>`
}

function redirectToQuerylessUrl(req) {
  const currentUrlWithoutParams = req.url?.substr(0, req.url.indexOf('?'))
  return {
    redirect: {
      destination: currentUrlWithoutParams,
      permanent: true,
    },
  }
}
