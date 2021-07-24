import React from 'react'
import styled from 'styled-components'

export default function PolishCowWidget({ onClick }) {
  return <Image src="polish-cow.gif" onClick={onClick} />
}

const Image = styled.img`
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
