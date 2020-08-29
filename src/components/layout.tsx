/** @jsx jsx */
import { Link } from 'gatsby'
import React, { PropsWithChildren, useState } from 'react'
import { rhythm } from '../utils/typography'
import Container from './Container'
import Navbar from './navbar'
import { GlobalStyle } from './global-style'
import { css, jsx } from '@emotion/core'
import Switch from 'react-switch'

interface LayoutProps {
  title: string
  subtitle: string
}

const theme = {
  light: {
    bgColor: '#fff',
    primary: '#5E81AC',
    text: 'hsla(0,0%,0%,0.9)',
    headingsColor: 'hsla(0,0%,0%,0.9)',
    blockquoteText: '#2E3440',
    hrColor: 'hsla(0,0%,0%,0.2)',
  },
  dark: {
    bgColor: '#2E3440',
    primary: '#81A1C1',
    text: 'hsla(0,0%,100%,0.88)',
    headingsColor: '#fff',
    blockquoteText: '#E5E9F0',
    hrColor: 'hsla(0,0%,100%,0.3)',
  },
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ title, subtitle, children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true)

  return (
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
            onChange={() => setIsLightTheme(!isLightTheme)}
            checked={isLightTheme}
            offColor="#4C566A"
            onColor="#4C566A"
            activeBoxShadow="0 0 2px 5px #ECEFF4"
          />
        </div>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
      <GlobalStyle theme={theme[isLightTheme ? 'light' : 'dark']} />
    </Container>
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
