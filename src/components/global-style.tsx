import React from 'react'
import { Global, css } from '@emotion/core'

export const GlobalStyle = (props) => (
  <Global
    {...props}
    styles={css`
      body {
        background-color: ${props.theme.bgColor};
        color: ${props.theme.text};

        a {
          color: ${props.theme.primary};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: ${props.theme.headingsColor};
        }

        blockquote {
          border-left: 0.32813rem solid ${props.theme.primary};
          color: ${props.theme.blockquoteText};
        }

        hr {
          background: ${props.theme.hrColor};
        }
      }
    `}
  />
)
