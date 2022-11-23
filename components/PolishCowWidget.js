import { styled } from '@linaria/react'
import NextImage from "next/image";
import React from 'react'
import { withTheme } from 'theme'

export default function PolishCowWidget({ onClick }) {
  return (
    <Wrapper onClick={onClick}>
      <NextImage
        src="/polish-cow.gif"
        width={64}
        height={64}
        alt="polish cow"
        style={{
          maxWidth: "100%",
          height: "auto"
        }} />
    </Wrapper>
  );
}

const Wrapper = withTheme(styled.div`
  width: 64px;
  position: fixed;
  bottom: 24px;
  right: 24px;
  cursor: pointer;

  @media (max-width: 62em) {
    display: none;
  }

  @media (prefers-reduced-motion) {
    display: none;
  }
`)
