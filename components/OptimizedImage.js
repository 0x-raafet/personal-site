import NextImage from 'next/image'
import React from 'react'
import styled from 'styled-components'

export default function OptimizedImage({ src, ...rest }) {
  return (
    <Wrapper className="optimized-image-wrapper">
      <NextImage
        src={src}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mPkj6+vBwAC4AFuNSmtGAAAAABJRU5ErkJggg=="
        layout="fill"
        objectFit="cover"
        {...rest}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
`
