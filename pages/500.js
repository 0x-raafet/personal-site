import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Container from 'components/Container'

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Ooops XD | bstefanski.com</title>
      </Head>
      <Container>
        <h2>Oooops XD</h2>
        <h1>500 - Server-side error occurred</h1>
      </Container>
    </>
  )
}
