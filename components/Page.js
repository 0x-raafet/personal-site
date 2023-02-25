import { styled } from '@linaria/react'
import React from 'react'
import { withTheme } from 'theme'

export default function Page({ title, description, children }) {
  const hasNoTitleNorDescription = !title && !description

  return (
    <Wrapper>
      {hasNoTitleNorDescription ? null : (
        <PageHeaderWrapper>
          {title ? <Title>{title}</Title> : null}
          {description ? <Description>{description}</Description> : null}
        </PageHeaderWrapper>
      )}
      <Content>{children}</Content>
    </Wrapper>
  )
}

const Wrapper = withTheme(styled.div`
  padding: 0 12px;
  margin: 0 auto;
  margin-bottom: 96px;
  max-width: 1100px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`)

const Title = withTheme(styled.h1`
  font-size: 12px;
  font-weight: bold;
  line-height: 1.5;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text);
  opacity: 0.8;

  @media (max-width: 30em) {
    line-height: 2;
  }
`)

const Description = withTheme(styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 1.25;
  letter-spacing: -0.02em;
  color: var(--text);

  @media (max-width: 30em) {
    font-size: 28px;
  }
`)

const PageHeaderWrapper = withTheme(styled.div`
  margin-bottom: 48px;

  @media (max-width: 30em) {
    text-align: center;
    width: 100%;
  }
`)

const Content = withTheme(styled.main`
  width: 100%;
`)
