import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { rhythm } from '../utils/typography'

const NavigationList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  list-style: none;

  & > *:not(:last-child) {
    margin-right: ${rhythm(0.5)};
  }

  @media (max-width: 32.5625em) {
    margin: 0;
  }
`

const Navbar: React.FC = () => {
  return (
    <nav>
      <NavigationList>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/side-projects">Side Projects</Link>
        </li>
        <li>
          <Link to="/portfolio">Portfolio</Link>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>
      </NavigationList>
    </nav>
  )
}

export default Navbar
