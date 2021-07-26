import styled from 'styled-components'

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: ${(p) => p.theme.spacings.mediumContainer}px;
  padding: 0 ${(p) => p.theme.spacings.xs}px;
  margin: 0 auto;
`

export default Container
