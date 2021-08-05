import { EnvVars } from 'env'
import { getAllPostsSlugs } from 'utils/postsFetcher'

export default function NewsIndexSitemap() {}

export async function getServerSideProps({ res, req, query }) {
  const hasForbiddenQueryParams = Object.keys(query).length > 1
  if (hasForbiddenQueryParams) {
    return redirectToQuerylessUrl(req)
  }

  res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate')
  res.setHeader('Content-Disposition', 'inline')
  res.setHeader('Content-Type', 'text/xml')

  res.write(mapToXmlFormat(getAllPostsSlugs(), EnvVars.URL))
  res.end()
  return { props: {} }
}

function mapToXmlFormat(paths, host) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${paths
        .map(
          (singlePath) => `<sitemap>
          <loc>${host + singlePath}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>`,
        )
        .join('\n')}
  </sitemapindex>
  `
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
