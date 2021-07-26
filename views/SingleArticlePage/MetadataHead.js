import React from 'react'
import Head from 'next/head'

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
