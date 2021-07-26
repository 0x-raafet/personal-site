import React from 'react'
import styled from 'styled-components'
import NextLink from 'next/link'

export default function Navigation(props) {
  // TODO: isActive
  // TODO: Drawer
  return (
    <nav>
      <Container>
        <NavItem>
          <NextLink href="/">Home</NextLink>
        </NavItem>
        <NavItem>
          <NextLink href="/snippets">Snippets</NextLink>
        </NavItem>
        <NavItem>
          <NextLink href="/links">Links</NextLink>
        </NavItem>
      </Container>
    </nav>
  )
}

const Container = styled.ul`
  display: flex;
  grid-gap: ${(p) => p.theme.spacings.sm}px;
  justify-content: center;
  padding: 0;
  list-style: none;
  text-align: center;
`

const NavItem = styled.li`
  a {
    font-size: ${(p) => p.theme.fontSizes['lg']}px;
    display: block;
    color: currentColor;
    text-decoration: none;
    border-radius: 5px;
    padding: 5px 10px;

    &:hover {
      background-color: var(--navbar-item-hover);
    }

    &:active,
    &:focus {
      background-color: var(--navbar-item-focus);
    }
  }
`
