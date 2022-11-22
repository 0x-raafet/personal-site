import { styled } from '@linaria/react'
import React from 'react'
import { withTheme } from 'theme'

export default function FadeIn({ duration = 300, delay = 0, children, ...delegated }) {
  return (
    <Wrapper
      {...delegated}
      style={{
        ...(delegated.style || {}),
        animationDuration: duration + 'ms',
        animationDelay: delay + 'ms',
      }}
    >
      {children}
    </Wrapper>
  )
}

const Wrapper = withTheme(styled.div`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: fadeIn;
    animation-fill-mode: backwards;

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
`)
