import Head from 'next/head'
import React from 'react'
import Container from 'components/Container'

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
