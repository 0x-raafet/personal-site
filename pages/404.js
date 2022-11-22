import { styled } from '@linaria/react'
import Head from 'next/head'
import React from 'react'
import Container from 'components/Container'
import { withTheme } from 'theme'

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Not found | bstefanski.com</title>
      </Head>
      <Wrapper>
        <Container>
          <h1>404 - Page Not Found</h1>
        </Container>
      </Wrapper>
    </>
  )
}

const Wrapper = withTheme(styled.div`
  padding: ${(p) => p.theme.spacings.xl}px 0;
`)
