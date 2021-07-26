import styled from 'styled-components'
import { MDXRemote } from 'next-mdx-remote'
import Code from 'components/Code'
import Quote from './Quote'
import Link from './Link'
import ArticleImage from './ArticleImage'

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

  ol,
  ul {
    font-size: ${(p) => p.theme.fontSizes['xl']}px;
    line-height: 30px;
    padding-left: 24px;
    li {
      & > * {
        vertical-align: top;
      }
    }
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
  Image: ArticleImage,
  a: Link,
  Code,
  Quote,
}
