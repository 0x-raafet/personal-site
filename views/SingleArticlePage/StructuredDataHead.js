import { EnvVars } from 'env'
import Head from 'next/head'
import { jsonLdScriptProps } from 'react-schemaorg'
import { Article, BreadcrumbList, ImageObject, Organization } from 'schema-dts'

export default function StructuredDataHead(props) {
  const { slug, title, date, description, tags } = props
  const currentSiteUrl = EnvVars.URL + slug
  const ogImageUrl = EnvVars.OG_IMAGES_URL + `${slug}.png`

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
          image: {
            '@type': 'ImageObject',
            url: ogImageUrl,
          },
          publisher: {
            '@type': 'Person',
            name: 'Bart Stefański',
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
