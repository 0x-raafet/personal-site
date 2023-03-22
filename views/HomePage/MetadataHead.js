import Head from 'next/head'
import React from 'react'

export default function MetadataHead(props) {
  const description =
    'A self-taught full-stack software engineer based in Poland, working in Next.js & Nest.js Stack. Passionate about Clean Code, Object-Oriented Architecture and fast web. '

  return (
    <Head>
      <title>Home | bstefanski.com</title>
      <meta name="author" content="Bart Stefański" />
      <meta name="description" content={description} />
      <meta property="og:title" content="Bart Stefański" />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Bart Stefański" />
      <meta name="msvalidate.01" content="569F112AF9AAA5B36792C8D9CD150514" />
      <meta name="yandex-verification" content="2205d0fb8859f110" />
    </Head>
  )
}
