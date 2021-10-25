import NextImage from 'next/image'
import React from 'react'
import styled from 'styled-components'

export default function PolishCowWidget({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <NextImage src="/polish-cow.gif" width={64} height={64} alt="polish cow" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 64px;
  position: fixed;
  bottom: ${(p) => p.theme.spacings.sm}px;
  right: ${(p) => p.theme.spacings.sm}px;
  cursor: pointer;

  @media (max-width: ${(p) => p.theme.breakpoints.lg}) {
    display: none;
  }

  @media (prefers-reduced-motion) {
    display: none;
  }
`
