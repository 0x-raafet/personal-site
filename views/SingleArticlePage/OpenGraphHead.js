import React from 'react'
import Head from 'next/head'
import { EnvVars } from 'env'

export default function OpenGraphHead(props) {
  const { slug, title, description, date, tags } = props

  const currentUrl = EnvVars.URL + slug
  const ogImageUrl = EnvVars.OG_IMAGES_URL + `${slug}.png`

  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="bstefanski.com" />
      <meta property="og:type" content="article" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:alt" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="article:published_time" content={new Date(date)} />
      <meta property="article:author" content={EnvVars.FACEBOOK_PROFILE} />
      <meta property="article:section" content={tags} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={EnvVars.TWITTER_PROFILE} />
      <meta name="twitter:site" content={EnvVars.TWITTER_PROFILE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={description} />
      <meta name="robots" content="max-image-preview:large"></meta>
    </Head>
  )
}
