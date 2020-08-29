import React, { PropsWithChildren } from 'react'
import { Link, PageProps } from 'gatsby'
import Container from './Container'

interface LayoutProps {
  title: string
}

const Layout: React.FC<PropsWithChildren<LayoutProps>> = ({ title, children }) => {
  return (
    <Container>
      <header>
        <h1 style={{ marginTop: 0 }}>
          <Link style={{ boxShadow: `none`, color: `inherit` }} to={`/`}>
            {title}
          </Link>
        </h1>
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
