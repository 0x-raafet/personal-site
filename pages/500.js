import { styled } from '@linaria/react'
import Head from 'next/head'
import React from 'react'
import Container from 'components/Container'
import { withTheme } from 'theme'

export default function Custom500() {
  return (
    <>
      <Head>
        <title>Ooops XD | bstefanski.com</title>
      </Head>
      <Wrapper>
        <Container>
          <h2>Oooops XD</h2>
          <h1>500 - Server-side error occurred</h1>
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = withTheme(styled.div`
  padding: ${(p) => p.theme.spacings.xl}px 0;
`)
