import { useClipboard } from 'hooks/useClipboard'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React, { useState } from 'react'
import styled from 'styled-components'
import Icon from 'components/icons/Icon'
import CopyIcon from './icons/CopyIcon'

export default function Code({ code, language, withCopyButton = true }) {
  const nullAwareLanguage = language || 'js'
  const { copy, copied } = useClipboard({
    copiedTimeout: 600,
  })

  function handleCopyClick(code) {
    copy(code)
  }

  return (
    <Highlight {...defaultProps} theme={null} code={code} language={nullAwareLanguage}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <CodeWrapper className="code-wrapper" language={nullAwareLanguage}>
          {withCopyButton && <CopyButton copied={copied} onClick={() => handleCopyClick(code)} />}
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

const CopyButton = styled(CopyIcon)`
  position: absolute;
  top: ${(p) => p.theme.spacings.sm}px;
  right: ${(p) => p.theme.spacings.sm}px;
  visibility: hidden;
  background-color: var(--overlay);
  cursor: pointer;
  width: 30px;
  height: 30px;
  opacity: 0.7;
  line-height: normal;
  border-radius: 3px;
  color: var(--text);

  &::after {
    position: absolute;
    content: 'Copied';
    visibility: ${(p) => (p.copied ? 'visible' : 'hidden')};
    top: 0;
    left: -25px;
    height: 30px;
    border-radius: 3px;
    padding: 5px;
    color: inherit;
    background-color: var(--overlay);
  }

  &:hover {
    background-color: var(--overlay-lighter);
  }
`

const CodeWrapper = styled.div`
  position: relative;
  border-radius: 0.3em;
  margin: ${(p) => p.theme.spacings.md}px 0px;
  transition: visibility 0.1s;

  &::after {
    position: absolute;
    height: 2.2em;
    content: '${(p) => p.language}';
    right: ${(p) => p.theme.spacings.sm}px;
    padding: ${(p) => p.theme.spacings.xs}px;
    top: -2em;
    line-height: 10px;
    border-radius: 0.3em;
    font-size: ${(p) => p.theme.fontSizes.md}px;
    text-transform: uppercase;
    background-color: inherit;
    font-weight: bold;
    text-align: center;
  }

  &:hover {
    ${CopyButton} {
      visibility: visible;
    }
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
