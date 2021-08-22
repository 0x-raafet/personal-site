import styled from 'styled-components'

export default function Spacer(props) {
  return <Wrapper {...props} />
}

const Wrapper = styled.hr`
  width: 100%;
  border-color: currentColor;
`
