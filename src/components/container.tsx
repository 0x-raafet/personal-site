import React from 'react'
import styled from '@emotion/styled'
import { rhythm } from '../utils/typography'

const ResponsiveContainer = styled.div`
  max-width: ${rhythm(30)};
  width: 100%;
  margin: ${rhythm(2.5)} auto;
  padding: 0 ${rhythm(1.6)};
`

const Container: React.FC = ({ children }) => {
  return <ResponsiveContainer>{children}</ResponsiveContainer>
}

export default Container
