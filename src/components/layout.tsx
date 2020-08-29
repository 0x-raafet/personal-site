import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React, { PropsWithChildren } from 'react'
import { rhythm } from '../utils/typography'
import Container from './Container'
import Navbar from './navbar'

interface LayoutProps {
  title: string
  subtitle: string
}

const Title = styled.h1`
  margin-bottom: ${rhythm(0.5)};
`

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ title, subtitle, children }) => {
  return (
    <Container>
      <header>
        <Link style={{ boxShadow: `none`, color: `inherit` }} to={`/`}>
          <Title>{title}</Title>
        </Link>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </Container>
  )
}

export default Layout
