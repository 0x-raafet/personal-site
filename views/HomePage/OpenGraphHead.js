import Head from 'next/head'
import React from 'react'

export default function OpenGraphHead(props) {
  return (
    <Head>
      <meta property="og:url" content="https://bstefanski.com/base-home-og-image.png" />
      <meta property="og:image" content="https://bstefanski.com/base-home-og-image.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  )
}
