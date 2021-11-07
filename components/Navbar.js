import * as Drawer from '@accessible/drawer'
import { useRouter } from 'next/dist/client/router'
import dynamic from 'next/dynamic'
import NextLink from 'next/link'
import { lighten } from 'polished'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { useScrollPosition } from 'hooks/useScrollPosition'
import ClientOnly from './ClientOnly'
import ColorSwitcher from './ColorSwitcher'
import FadeIn from './FadeIn'
import { HamburgerIcon } from './icons/HamburgerIcon'
import Logotype from './Logotype'
import Navigation from './Navigation'

export default function Navbar({ items }) {
  const router = useRouter()
  const { open, close, toggle, isOpen } = Drawer.useDrawer()
  const [scrollingDirection, setScrollingDirection] = useState('none')

  let lastScrollY = useRef(0)
  const lastRoute = useRef()
  const stepSize = useRef(50)

  useScrollPosition(scrollPositionCallback, [router.asPath], false, false, 50)

  function scrollPositionCallback({ currPos }) {
    const routerPath = router.asPath
    const hasRouteChanged = routerPath !== lastRoute.current

    if (hasRouteChanged) {
      lastRoute.current = routerPath
      setScrollingDirection('none')
      return
    }

    const currentScrollY = currPos.y
    const isScrollingUp = currentScrollY > lastScrollY.current
    const scrollDifference = Math.abs(lastScrollY.current - currentScrollY)
    const hasScrolledWholeStep = scrollDifference >= stepSize.current
    const isInNonCollapsibleArea = lastScrollY.current > -200

    if (isInNonCollapsibleArea) {
      setScrollingDirection('none')
      lastScrollY.current = currentScrollY
      return
    }

    if (!hasScrolledWholeStep) {
      lastScrollY.current = currentScrollY
      return
    }

    setScrollingDirection(isScrollingUp ? 'up' : 'down')
    lastScrollY.current = currentScrollY
  }

  const isNavbarHidden = scrollingDirection === 'down'

  return (
    <Container isNavbarHidden={isNavbarHidden}>
      <Content>
        <NextLink href="/" passHref>
          <Logotype />
        </NextLink>
        <NavigationWrapper>
          <Navigation items={items} />
        </NavigationWrapper>
        <div className="color-switcher-wrapper" style={{ width: '52px', height: '52px' }}>
          <ClientOnly>
            <ColorSwitcher />
          </ClientOnly>
        </div>
        <HamburgerMenuWrapper>
          <HamburgerIcon onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </Container>
  )
}

const Container = styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  top: ${(p) => p.theme.spacings.xs}px;
  width: 100%;
  max-width: ${(p) => p.theme.spacings.largeContainer}px;
  height: 75px;
  margin: 0 auto ${(p) => p.theme.spacings.lg}px auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 20px;
  background-color: var(--navbar);

  visibility: ${(p) => (p.isNavbarHidden ? 'hidden' : 'visible')};
  transform: ${(p) =>
    p.isNavbarHidden
      ? `translateY(-75px) translateY(-${p.theme.spacings.xs}px) translateZ(0) scale(1)`
      : 'translateY(0) translateZ(0) scale(1)'};
  backface-visibility: hidden;
  transition-property: transform, visibility, height;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;

  z-index: ${(p) => p.theme.zIndexes.navbar};

  @media (max-width: ${(p) => p.theme.breakpoints.xl}) {
    width: 95%;
  }

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    margin: 0 auto 60px auto;
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 ${(p) => p.theme.spacings.md}px;

  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    padding: 0 ${(p) => p.theme.spacings['2xs']}px;
    justify-content: flex-start;

    .color-switcher-wrapper {
      margin-left: auto;
    }
  }
`

const HamburgerMenuWrapper = styled.div`
  display: none;
  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    display: block;
    line-height: 1;
  }
`

const NavigationWrapper = styled.div`
  display: block;
  @media (max-width: ${(p) => p.theme.breakpoints.md}) {
    display: none;
  }
`
