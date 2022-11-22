import { styled } from '@linaria/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { withTheme } from 'theme'

export default function Navigation({ items }) {
  const router = useRouter()

  return (
    <nav>
      <Container>
        {items.map((singleItem) => {
          const isActive = router.route === singleItem.href && router.asPath !== '/404'
          return (
            <NavItem key={singleItem.href} isActive={isActive}>
              <NextLink href={singleItem.href}>{singleItem.title}</NextLink>
            </NavItem>
          )
        })}
      </Container>
    </nav>
  )
}

const Container = withTheme(styled.ul`
  display: flex;
  justify-content: center;
  padding: 0;
  list-style: none;
  text-align: center;

  & > *:not(:first-child) {
    margin-left: 24px;
  }
`)

const NavItem = withTheme(styled.li`
  a {
    font-size: 16px;
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
`)
