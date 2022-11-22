import { styled } from '@linaria/react'
import React from 'react'
import { withTheme } from 'theme'

export default function Icon({ _ref, width, height, ...rest }) {
  return <IconWrapper width={width} height={height} {...rest} {...(_ref && { ref: _ref })} />
}

const IconWrapper = withTheme(styled.button`
  border: none;
  background-color: transparent;
  width: ${(p) => p.width || '40px'};
  height: ${(p) => p.height || 'unset'};
`)
