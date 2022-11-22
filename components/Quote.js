import { styled } from '@linaria/react'
import React from 'react'
import { withTheme } from 'theme'

export default function Quote({ content, author, cite }) {
  return (
    <Container>
      <Blockquote {...(cite && { cite })}>{content}</Blockquote>
      <Caption>— {author}</Caption>
    </Container>
  )
}

const Container = withTheme(styled.figure`
  border-left: 1px solid var(--primary);
  padding: 30px;
  quotes: ${`)"\\201c" "\\201d" "\\2018" "\\2019"`};
  color: var(--primary);

  &::before {
    content: open-quote;
    font-size: 8em;
    line-height: 0.1em;
    margin-right: 0.25em;
    vertical-align: -0.4em;
    opacity: 0.6;
    font-family: arial, sans-serif;
  }
`)

const Blockquote = withTheme(styled.blockquote`
  color: var(--text);
  display: inline;
  font-size: 20px;
  line-height: 30px;
  font-style: italic;
  hanging-punctuation: first;
`)

const Caption = withTheme(styled.figcaption`
  color: var(--text);
  display: block;
  margin-top: 30px;
`)
