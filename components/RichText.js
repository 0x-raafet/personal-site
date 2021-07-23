import styled from 'styled-components'
import { MDXRemote } from 'next-mdx-remote'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Code from 'components/Code'
import Quote from './Quote'
import Link from './Link'

export default function RichText(props) {
  return (
    <Container>
      <MDXRemote {...props} components={components} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  ${'' /* Opting-out of margin-collapse */}

  flex-direction: column;
  width: 100%;
  grid-gap: 38px;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    .remark-highlight {
      width: 100%;
      overflow-x: auto;
    }
  }

  & > section,
  .footnotes {
    ${'' /* content-visibility: auto; */}
  }
`

const Paragraph = styled.p`
  font-size: ${(p) => p.theme.fontSizes['xl']}px;
  line-height: 30px;
  hanging-punctuation: first;

  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

const SecondHeading = styled.h2`
  font-size: ${(p) => p.theme.fontSizes['3xl']}px;
  line-height: 38px;
  margin-bottom: 38px;
`

const ThirdHeading = styled.h3`
  font-size: ${(p) => p.theme.fontSizes['2xl']}px;
  line-height: 34px;
  margin-bottom: 34px;
`

const Break = styled.br`
  display: block;
  content: '';
  margin: 0;
  height: 30px;
`

const components = {
  h2: SecondHeading,
  h3: ThirdHeading,
  p: Paragraph,
  br: Break,
  a: Link,
  Code,
  Quote,
}
