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

interface LayoutProps {
  title: string
}

type ThemeType = keyof typeof themes

export type SingleTheme = typeof themes['light']

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

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ title, children }) => {
  const [theme, setTheme] = useState<ThemeType>(null)

  useEffect(() => {
    const preservedTheme: ThemeType | undefined = window.localStorage.getItem('theme') as ThemeType
    setTheme(preservedTheme || 'light')
  }, [])

  useEffect(() => {
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeProvider theme={(themes[theme] || themes['light']) as SingleTheme}>
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
              checked={theme === 'dark'}
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
        <GlobalStyle />
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
