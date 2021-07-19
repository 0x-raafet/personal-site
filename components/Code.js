import Highlight, { defaultProps } from 'prism-react-renderer'
import React from 'react'
import styled from 'styled-components'

export default function Code({ code, language }) {
  const nullAwareLanguage = language || 'js'

  return (
    <Highlight {...defaultProps} theme={null} code={code} language={nullAwareLanguage}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeWrapper className="code-wrapper" language={nullAwareLanguage}>
          <Pre className={className} style={style}>
            {tokens.map((line, i) => (
              <Line key={i} {...getLineProps({ line, key: i })}>
                <LineNo>{i + 1}</LineNo>
                <LineContent>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </LineContent>
              </Line>
            ))}
          </Pre>
        </CodeWrapper>
      )}
    </Highlight>
  )
}

const CodeWrapper = styled.div`
  position: relative;
  border-radius: 0.3em;
  margin: ${(p) => p.theme.spacings.md}px 0px;

  &::after {
    position: absolute;
    content: '${(p) => p.language}';
    right: ${(p) => p.theme.spacings.sm}px;
    padding: ${(p) => p.theme.spacings.xs}px;
    top: -2em;
    line-height: normal;
    border-radius: 0.3em;
    font-size: ${(p) => p.theme.fontSizes.md}px;
    text-transform: uppercase;
    background-color: inherit;
    font-weight: bold;
    text-align: center;
  }
`

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
`

const Line = styled.div`
  display: table-row;
`

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`

const LineContent = styled.span`
  display: table-cell;
`
