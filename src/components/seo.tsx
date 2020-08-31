import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql, PageProps } from 'gatsby'

interface SeoProps {
  description?: string
  lang?: string
  meta?: any[]
  title: string
}

interface SeoData {
  site: {
    siteMetadata: {
      title: string
      description: string
      social: {
        twitter: string
      }
    }
  }
}

const Seo: React.FC<SeoProps> = ({ description = '', lang = 'en', meta = [], title }) => {
  const { site }: SeoData = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            social {
              twitter
            }
          }
        }
      }
    `,
  )

  const metaDescription = description || site.siteMetadata.description
  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}

export default Seo
