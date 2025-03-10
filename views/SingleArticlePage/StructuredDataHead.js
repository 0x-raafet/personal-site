import { formatDistance, parse } from 'date-fns'
import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Article, BreadcrumbList, ImageObject, Organization } from 'schema-dts'
import { EnvVars } from 'env'
import { formatDate } from 'utils/formatDate'

export default function StructuredDataHead(props) {
  const { slug, title, date, description, tags } = props
  const currentSiteUrl = EnvVars.URL + slug

  const dateDistance = formatDistance(new Date(parse(formatDate(new Date(date)), 'do MMMM yyyy', Date.now())), Date.now(), {
    addSuffix: true,
  })
  const ogImageUrl = `https://bstefanski.com/api/og?title=${title}&date=${date}&dateDistance=${dateDistance}`
  const faviconUrl = EnvVars.URL + 'favicon.png'

  return (
    <Head>
      <script
        {...jsonLdScriptProps({
          '@context': 'https://schema.org',
          '@type': 'TechArticle',
          mainEntityOfPage: `${currentSiteUrl}#content`,
          headline: title,
          datePublished: date,
          dateModified: date,
          author: {
            '@type': 'Person',
            name: 'Bart Stefański',
          },
          description: description,
          dependencies: tags,
          proficiencyLevel: 'Beginner',
          publisher: {
            '@type': 'Organization',
            name: 'bstefanski.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://i.giphy.com/media/7f8tVWxSu4BTnEOd7o/giphy-facebook_s.jpg',
            },
          },
          image: {
            '@type': 'ImageObject',
            url: ogImageUrl,
          },
        })}
      />

      <script
        {...jsonLdScriptProps({
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'bstefanski.com',
          alternateName: 'bstefanski.com',
          url: 'https://bstefanski.com',
        })}
      />
    </Head>
  )
}
