import React from 'react'
import styled from 'styled-components'

export default function Page({ title, description, children }) {
  return (
    <Wrapper>
      <PageHeaderWrapper>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </PageHeaderWrapper>
      <main>{children}</main>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 0 ${(p) => p.theme.spacings.xs}px;
  margin: 0 auto;
  max-width: ${(p) => p.theme.spacings.largeContainer}px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Title = styled.h1`
  font-size: ${(p) => p.theme.fontSizes.sm}px;
  font-weight: bold;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.8;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    line-height: 2;
  }
`

const Description = styled.div`
  font-size: ${(p) => p.theme.fontSizes['4xl']}px;
  font-weight: bold;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes['3xl']}px;
  }
`

const PageHeaderWrapper = styled.div`
  margin-bottom: ${(p) => p.theme.spacings.md}px;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    text-align: center;
    width: 100%;
  }
`
