import { styled } from '@linaria/react'
import React from 'react'
import { withTheme } from 'theme'

export default function Header({ title, formattedDate, readTime }) {
  const hasNoDateNorReadtime = !formattedDate && !readTime

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {hasNoDateNorReadtime ? null : <DetailsContainer>{formattedDate}</DetailsContainer>}
    </HeaderContainer>
  )
}

const HeaderContainer = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin-bottom: 60px;
`)

const Title = withTheme(styled.h1`
  font-weight: bold;
  font-size: 40px;
  line-height: 1.33333;

  & + div {
    margin-top: 28px;
  }

  @media (max-width: 30em) {
    font-size: 32px;
  }
`)

const DetailsContainer = withTheme(styled.div`
  font-size: 14px;
  color: var(--text-lighter);
`)
