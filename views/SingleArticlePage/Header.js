import React from 'react'
import styled from 'styled-components'
import MidDot from 'components/MidDot'

export default function Header({ title, formattedDate, readTime }) {
  const hasNoDateNorReadtime = !formattedDate && !readTime

  return (
    <HeaderContainer>
      <Title>{title}</Title>
      {hasNoDateNorReadtime ? null : (
        <DetailsContainer>
          {formattedDate} <MidDot />
        </DetailsContainer>
      )}
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${(p) => p.theme.spacings.smallContainer}px;
  margin-bottom: 60px;
`

const Title = styled.h1`
  font-weight: bold;
  font-size: ${(p) => p.theme.fontSizes['5xl']}px;
  line-height: 56px;

  & + div {
    margin-top: 28px;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes['4xl']}px;
  }
`

const DetailsContainer = styled.div`
  font-size: ${(p) => p.theme.fontSizes['md']}px;
  color: var(--text-lighter);
`
