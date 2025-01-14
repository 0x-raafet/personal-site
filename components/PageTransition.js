import { styled } from '@linaria/react'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { withTheme } from 'theme'

export default function PageTransition({ children }) {
  const isFirstRender = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (!isFirstRender.current) {
      isFirstRender.current = true
    }
  })

  if (!isFirstRender.current) {
    return children
  }

  return (
    <Animation key={router.route} delay={50} duration={400}>
      {children}
    </Animation>
  )
}

function Animation({ duration, delay, children }) {
  return (
    <Wrapper
      style={{
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
    animation-name: keyframe;
    animation-fill-mode: backwards;

    @keyframes keyframe {
      from {
        opacity: 0;
        transform: translate3d(0, 50px, 0);
      }

      to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }
    }
  }
`)
