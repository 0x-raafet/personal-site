import { styled } from '@linaria/react'
import { MDXRemote } from 'next-mdx-remote'
import Code from 'components/Code'
import { withTheme } from 'theme'
import { theme } from 'theme'
import ArticleImage from './ArticleImage'
import Link from './Link'
import Quote from './Quote'

export default function RichText(props) {
  return (
    <Container>
      <MDXRemote {...props} components={components} />
    </Container>
  )
}

const Container = withTheme(styled.div`
  display: flex;
  ${'' /* Opting-out of margin-collapse */}
  margin-bottom: 38px;

  flex-direction: column;
  width: 100%;

  section:not(:last-child) {
    margin-bottom: 32px;
  }

  a {
    word-break: break-word;
  }

  @media (max-width: ${theme.breakpoints.md}) {
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
    font-size: ${theme.fontSizes['xl']}px;
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

    @media (max-width: ${theme.breakpoints.sm}) {
      font-size: ${theme.fontSizes['lg']}px;
    }
  }
`)

const Paragraph = withTheme(styled.p`
  font-size: ${theme.fontSizes['xl']}px;
  line-height: 1.75;
  hanging-punctuation: first;

  &:not(:last-child) {
    margin-bottom: 30px;
  }

  & + ul,
  & + li {
    margin-top: -15px !important;
  }

  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: ${theme.fontSizes['lg']}px;
  }
`)

const SecondHeading = withTheme(styled.h2`
  font-size: ${theme.fontSizes['3xl']}px;
  line-height: 1.4;
  margin-bottom: 24px;
`)

const ThirdHeading = withTheme(styled.h3`
  font-size: ${theme.fontSizes['2xl']}px;
  line-height: 1.4;
  margin-bottom: 18px;
`)

const Break = withTheme(styled.br`
  display: block;
  content: '';
  margin: 0;
  height: 15px;
`)

const TextHighlight = withTheme(styled.code`
  display: inline-block;
  padding: 0 ${theme.spacings['2xs']}px;
  color: var(--primary);
  border-radius: 4px;
  background-color: var(--text-highlight);
  font-size: inherit;
  font-family: inherit;
`)

const components = {
  h2: SecondHeading,
  h3: ThirdHeading,
  p: Paragraph,
  br: Break,
  inlineCode: TextHighlight,
  a: Link,
  ArticleImage,
  Code,
  Quote,
}
