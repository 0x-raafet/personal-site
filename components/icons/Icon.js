import React from 'react'
import styled from 'styled-components'

export default function Icon(props) {
  return <IconWrapper {...props} />
}

const IconWrapper = styled.button`
  border: none;
  background-color: transparent;
  width: 40px;
`
