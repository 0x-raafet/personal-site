import Container from 'components/Container'
import React from 'react'
import Head from 'next/head'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not found | bstefanski.com</title>
      </Head>
      <Container>
        <h1>404 - Page Not Found</h1>
      </Container>
    </>
  )
}
