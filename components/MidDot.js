import { styled } from '@linaria/react'
import { withTheme } from 'theme'

const MidDot = withTheme(styled.span`
  &::before {
    display: inline-block;
    content: '·';
    margin: 0 ${(p) => p.theme.spacings['2xs']}px;
  }
`)

export default MidDot
