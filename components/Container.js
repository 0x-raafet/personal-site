import { styled } from '@linaria/react'
import { withTheme } from 'theme'

const Container = withTheme(styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${(p) => p.theme.spacings.largeContainer}px;
  padding: 0 ${(p) => p.theme.spacings.xs}px;
  margin: 0 auto;
`)

export default Container
