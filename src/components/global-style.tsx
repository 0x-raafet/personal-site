import React from 'react'
import { Global, css } from '@emotion/core'

export const GlobalStyle = () => (
  <Global
    styles={(theme) => css`
      :root {
        --bgColor: ${theme.bgColor};
        --primary: ${theme.primary};
        --text: ${theme.text};
        --headingsColor: ${theme.headingsColor};
        --blockquoteText: ${theme.blockquoteText};
        --hrColor: ${theme.hrColor};
        --bookCard: ${theme.bookCard};
        --portfolioItemShadow: ${theme.portfolioItemShadow};
      }

      body {
        background-color: ${theme.bgColor};
        color: ${theme.text};

        a {
          color: ${theme.primary};
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: ${theme.headingsColor};
        }

        blockquote {
          border-left: 0.32813rem solid ${theme.primary};
          color: ${theme.blockquoteText};
        }

        hr {
          background: ${theme.hrColor};
        }
      }
    `}
  />
)
