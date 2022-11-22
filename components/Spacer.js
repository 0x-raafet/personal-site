import { styled } from '@linaria/react'
import { withTheme } from 'theme'

export default function Spacer(props) {
  return <Wrapper {...props} />
}

const Wrapper = withTheme(styled.hr`
  width: 100%;
  border-color: currentColor;
`)
