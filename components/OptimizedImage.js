import { styled } from '@linaria/react'
import NextImage from 'next/image'
import React from 'react'
import { withTheme } from 'theme'

export default function OptimizedImage({ src, ...rest }) {
  return (
    <Wrapper className="optimized-image-wrapper">
      <NextImage
        src={src}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkj6+vBwAC4AFuNSmtGAAAAABJRU5ErkJggg=="
        {...rest}
        fill
        sizes="100vw"
        style={{
          objectFit: rest.objectFit || 'cover',
        }}
      />
    </Wrapper>
  )
}

const Wrapper = withTheme(styled.div`
  position: relative;
`)
