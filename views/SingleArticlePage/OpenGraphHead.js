import React from 'react'
import Head from 'next/head'

export default function OpenGraphHead(props) {
  const { slug, title, description, date, tags } = props

  const currentUrl = `https://bstefanski.com/${slug}`
  // TODO:
  const ogImageUrl = `https://dev.bstefanski.com/og-images/${slug}.png`

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
      <meta property="article:author" content="https://www.facebook.com/bmstefanski" />
      <meta property="article:section" content={tags} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@bmstefanski" />
      <meta name="twitter:site" content="@bmstefanski" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={description} />
    </Head>
  )
}
