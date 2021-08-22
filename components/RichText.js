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

  section:not(:last-child) {
    margin-bottom: 38px;
  }

  a {
    word-break: break-word;
  }

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
    margin: 0;
    padding-left: 24px;
    li {
      & > * {
        vertical-align: top;
      }
    }

    &:not(:last-child) {
      margin-bottom: 30px;
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

  & + ul,
  & + li {
    margin-top: -15px !important;
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

const TextHighlight = styled.code`
  display: inline-block;
  padding: 0 ${(p) => p.theme.spacings['2xs']}px;
  color: var(--primary);
  border-radius: 4px;
  background-color: var(--text-highlight);
  font-size: 20px;
  font-family: inherit;
`

const components = {
  h2: SecondHeading,
  h3: ThirdHeading,
  p: Paragraph,
  br: Break,
  inlineCode: TextHighlight,
  Image: ArticleImage,
  a: Link,
  Code,
  Quote,
}
