import React from 'react'
import Head from 'next/head'

export default function MetadataHead(props) {
  const description =
    'A self-taught full-stack software engineer based in Poland, working in React.js & Nest.js Stack. Passionate about Clean Code, Object-Oriented Architecture and fast web. '

  return (
    <Head>
      <title>Home | bstefanski.com</title>
      <meta name="author" content="Bart Stefański" />
      <meta name="description" content={description} />
      <meta property="og:title" content="Bart Stefański" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Bart Stefański" />
    </Head>
  )
}
