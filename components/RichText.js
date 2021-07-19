import styled from 'styled-components'
import { MDXRemote } from 'next-mdx-remote'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Code from 'components/Code'

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
  grid-gap: ${(p) => p.theme.spacings.md}px;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    .remark-highlight {
      width: 100%;
      overflow-x: auto;
    }
  }

  & > section,
  .footnotes {
    content-visibility: auto;
  }
`

const Paragraph = styled.p`
  font-size: ${(p) => p.theme.fontSizes['xl']}px;
  line-height: 1.5;
  letter-spacing: -0.003em;
`

const SecondHeading = styled.h2`
  font-size: ${(p) => p.theme.fontSizes['3xl']}px;
  letter-spacing: 0;
  line-height: 1.5;
`

const ThirdHeading = styled.h3`
  font-size: ${(p) => p.theme.fontSizes['2xl']}px;
`

const components = {
  // h1: Heading.H1,
  h2: SecondHeading,
  h3: ThirdHeading,
  p: Paragraph,
  Code,
  // inlineCode: Code,
}
