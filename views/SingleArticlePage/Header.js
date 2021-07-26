import React from 'react'
import styled from 'styled-components'

export default function Header({ title, formattedDate, readTime }) {
  return (
    <HeaderContainer>
      <Title>{title}</Title>
      <DetailsContainer>
        {formattedDate} <MidDot /> {readTime}
      </DetailsContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: ${(p) => p.theme.spacings.smallContainer}px;
  margin-bottom: 112px;
`

const Title = styled.h1`
  font-weight: 600;
  font-size: ${(p) => p.theme.fontSizes['5xl']}px;
  line-height: 56px;
  margin-bottom: 28px;

  @media (max-width: ${(p) => p.theme.breakpoints.sm}) {
    font-size: ${(p) => p.theme.fontSizes['4xl']}px;
  }
`

const DetailsContainer = styled.div`
  font-size: ${(p) => p.theme.fontSizes['md']}px;
  color: var(--text-lighter);
`

const MidDot = styled.span`
  &::before {
    display: inline-block;
    content: '\x000B7';
    margin: 0 ${(p) => p.theme.spacings['2xs']}px;
  }
`
