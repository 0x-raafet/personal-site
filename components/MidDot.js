import styled from 'styled-components'

const MidDot = styled.span`
  &::before {
    display: inline-block;
    content: '·';
    margin: 0 ${(p) => p.theme.spacings['2xs']}px;
  }
`

export default MidDot
