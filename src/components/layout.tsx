/** @jsx jsx */
import { Link } from 'gatsby'
import React, { PropsWithChildren, useState, useEffect } from 'react'
import { rhythm } from '../utils/typography'
import Container from './container'
import Navbar from './navbar'
import { GlobalStyle } from './global-style'
import { css, jsx } from '@emotion/core'
import Switch from 'react-switch'
import { ThemeProvider } from 'emotion-theming'

type ThemeType = keyof typeof themes

interface LayoutProps {
  title: string
}

const themes = {
  light: {
    bgColor: '#fff',
    primary: '#5E81AC',
    text: 'hsla(0,0%,0%,0.9)',
    headingsColor: 'hsla(0,0%,0%,0.9)',
    blockquoteText: '#2E3440',
    hrColor: 'hsla(0,0%,0%,0.2)',
    bookCard: 'rgb(248,248,255, 0.45)',
    portfolioItemShadow: 'rgba(0, 0, 0, 0.05) 0px 0.5rem 1rem',
  },
  dark: {
    bgColor: '#2E3440',
    primary: '#81A1C1',
    text: 'hsla(0,0%,100%,0.88)',
    headingsColor: '#fff',
    blockquoteText: '#E5E9F0',
    hrColor: 'hsla(0,0%,100%,0.3)',
    bookCard: '#222831',
    portfolioItemShadow: 'rgba(15, 17, 21, 0.2) 0px 0.5rem 1rem',
  },
}

const getTheme: () => ThemeType = () => {
  if (typeof window !== 'undefined') {
    return (window.localStorage.getItem('theme') || 'light') as ThemeType
  }
  return 'light'
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ title, children }) => {
  const [theme, setTheme] = useState<ThemeType>(getTheme())

  return (
    <ThemeProvider theme={themes[theme]}>
      <Container>
        <header>
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: ${rhythm(0.5)};
            `}
          >
            <Link style={{ boxShadow: `none`, color: `inherit` }} to={`/`}>
              <h1
                css={css`
                  margin: auto;
                `}
              >
                {title}
              </h1>
            </Link>
            <Switch
              checkedIcon={<SwitchIcon emoji="🌚" />}
              uncheckedIcon={<SwitchIcon emoji="🌤️" />}
              onChange={() => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))}
              checked={theme === 'light'}
              offColor="#4C566A"
              onColor="#4C566A"
              activeBoxShadow="0 0 2px 5px #ECEFF4"
            />
          </div>
          <Navbar />
        </header>
        <main>{children}</main>
        <footer
          css={css`
            margin-top: 3rem;
          `}
        >
          © {new Date().getFullYear()} Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a> ❤️
        </footer>
        <GlobalStyle theme={themes[theme]} />
      </Container>
    </ThemeProvider>
  )
}

const SwitchIcon = ({ emoji }) => {
  return (
    <p
      css={css`
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
      `}
    >
      {emoji}
    </p>
  )
}

export default Layout
