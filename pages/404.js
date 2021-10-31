import Head from 'next/head'
import React from 'react'
import styled from 'styled-components'
import Container from 'components/Container'

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

const Wrapper = styled.div`
  padding: ${(p) => p.theme.spacings.xl}px 0;
`
