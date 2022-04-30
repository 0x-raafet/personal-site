import React from 'react'
import styled from 'styled-components'

export default function Icon({ _ref, width, height, ...rest }) {
  return <IconWrapper width={width} height={height} {...rest} {...(_ref && { ref: _ref })} />
}

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  width: ${(p) => p.width || '40px'};
  height: ${(p) => p.height || 'unset'};
`
