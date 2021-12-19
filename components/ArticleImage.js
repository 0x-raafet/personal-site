import React from 'react'
import styled from 'styled-components'
import { theme } from 'theme'
import OptimizedImage from './OptimizedImage'

export default function ArticleImage({ src, caption, ...rest }) {
  return (
    <Wrapper>
      <OptimizedImage objectFit="cover" src={src} {...rest} />
      <Caption>{caption}</Caption>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 30px;
  }

  .optimized-image-wrapper {
    position: relative;
    max-width: ${theme.spacings.mediumContainer}px;

    &::before {
      float: left;
      padding-top: 56.25%;
      content: '';
    }

    &::after {
      display: block;
      content: '';
      clear: both;
    }
  }
`

const Caption = styled.small`
  display: block;
  font-size: ${theme.fontSizes['sm']}px;
  text-align: center;
  margin-bottom: ${theme.fontSizes['md']}px;
`
