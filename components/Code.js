import { styled } from '@linaria/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import React from 'react'
import ClientOnly from 'components/ClientOnly'
import { useClipboard } from 'hooks/useClipboard'
import { withTheme } from 'theme'
import { theme } from 'theme'
import CopyIcon from './icons/CopyIcon'

export default function Code({ code, language, selectedLines = [], withCopyButton = true, withLineNumbers, caption }) {
  const nullAwareLanguage = language || 'js'
  const { copy, copied } = useClipboard({
    copiedTimeout: 600,
  })

  function handleCopyClick(code) {
    copy(code)
  }

  const copyButtonMarkup = (
    <ClientOnly>
      <CopyButton copied={copied} onClick={() => handleCopyClick(code)} />
    </ClientOnly>
  )

  return (
    <>
      <Highlight {...defaultProps} theme={null} code={code} language={nullAwareLanguage}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <>
            <CodeWrapper className="code-wrapper" data-language={nullAwareLanguage}>
              {withCopyButton && copyButtonMarkup}
              <Pre className={className} style={style}>
                {tokens.map((line, i) => {
                  const lineNumber = i + 1
                  const isSelected = selectedLines.includes(lineNumber)
                  const lineProps = getLineProps({ line, key: i })
                  const className = lineProps.className + (isSelected ? ' selected-line' : '')

                  return (
                    <Line key={i} {...{ ...lineProps, className }}>
                      {withLineNumbers && <LineNo>{lineNumber}</LineNo>}
                      <LineContent>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token, key })} />
                        ))}
                      </LineContent>
                    </Line>
                  )
                })}
              </Pre>
            </CodeWrapper>
            {caption && <Caption>{caption}</Caption>}
          </>
        )}
      </Highlight>
    </>
  )
}

const Caption = withTheme(styled.small`
  position: relative;
  top: -22px;
  word-break: break-word;
`)

const CopyButton = withTheme(styled(CopyIcon)`
  position: absolute;
  top: ${theme.spacings.sm}px;
  right: ${theme.spacings.sm}px;
  visibility: hidden;
  background-color: var(--overlay);
  cursor: pointer;
  width: 30px;
  height: 30px;
  opacity: 0.7;
  line-height: normal;
  border-radius: 3px;
  color: var(--text);
  z-index: 1;

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
`)

const CodeWrapper = withTheme(styled.div`
  position: relative;
  border-radius: 0.3em;
  margin-top: 25px;
  transition: visibility 0.1s;

  &:not(:last-child) {
    margin-bottom: 30px;
  }

  &::after {
    position: absolute;
    height: 2.2em;
    content: attr(data-language);
    right: ${theme.spacings.sm}px;
    padding: ${theme.spacings.xs}px;
    top: -2em;
    line-height: 10px;
    border-radius: 0.3em;
    font-size: ${theme.fontSizes.md}px;
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
`)

const Pre = withTheme(styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow: scroll;
`)

const Line = withTheme(styled.div`
  display: flex;
`)

const LineNo = withTheme(styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`)

const LineContent = withTheme(styled.span`
  display: table-cell;
`)
