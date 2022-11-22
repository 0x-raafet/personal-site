import { styled } from '@linaria/react'
import React from 'react'
import { withTheme } from 'theme'
import { theme } from 'theme'
import OptimizedImage from './OptimizedImage'

export default function ArticleImage({ src, caption, maxHeight, ...rest }) {
  return (
    <Wrapper maxHeight={maxHeight}>
      <OptimizedImage objectFit="cover" src={src} {...rest} />
      <Caption>{caption}</Caption>
    </Wrapper>
  )
}

const Wrapper = withTheme(styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .optimized-image-wrapper {
    position: relative;
    max-height: ${(props) => props.maxHeight};
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
`)

const Caption = withTheme(styled.small`
  display: block;
  font-size: ${theme.fontSizes['sm']}px;
  text-align: center;
  margin-bottom: ${theme.fontSizes['md']}px;
`)
