import { EnvVars } from 'env'
import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Article, BreadcrumbList, ImageObject, Organization } from 'schema-dts'

export default function StructuredDataHead(props) {
  const { slug, title, date } = props
  const currentSiteUrl = EnvVars.URL + slug

  return (
    <Head>
      <script
        {...jsonLdScriptProps({
          '@context': 'https://schema.org',
          '@type': 'NewsArticle',
          mainEntityOfPage: `${currentSiteUrl}#content`,
          headline: title,
          datePublished: date,
          dateModified: date,
          author: {
            '@type': 'Person',
            name: 'Bart Stefański',
          },
          description: 'description',
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
