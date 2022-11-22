import { styled } from '@linaria/react'
import { withTheme } from 'theme'

const Container = withTheme(styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1100px;
  padding: 0 12px;
  margin: 0 auto;
`)

export default Container
