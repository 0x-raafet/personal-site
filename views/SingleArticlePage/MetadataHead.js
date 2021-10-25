import Head from 'next/head'
import React from 'react'

export default function MetadataHead(props) {
  const { title, description } = props

  return (
    <Head>
      <title>{title} | bstefanski.com</title>
      <meta name="description" content={description} />
      <meta name="author" content="Bart Stefański" />
    </Head>
  )
}
