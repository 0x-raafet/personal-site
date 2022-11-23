import * as Drawer from '@accessible/drawer'
import { styled } from '@linaria/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'
import { useScrollPosition } from 'hooks/useScrollPosition'
import { withTheme } from 'theme'
import { HamburgerIcon } from './icons/HamburgerIcon'
import Logotype from './Logotype'
import Navigation from './Navigation'

export default function Navbar({ items }) {
  const router = useRouter()
  const { toggle } = Drawer.useDrawer()
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
        <NextLink href="/" passHref legacyBehavior>
          <Logotype />
        </NextLink>
        <NavigationWrapper>
          <Navigation items={items} />
        </NavigationWrapper>
        <div className="color-switcher-wrapper" style={{ width: '52px', height: '52px' }}>
          {/* <ClientOnly>
            <ColorSwitcher />
          </ClientOnly> */}
        </div>
        <HamburgerMenuWrapper>
          <HamburgerIcon onClick={toggle} />
        </HamburgerMenuWrapper>
      </Content>
    </Container>
  );
}

const Container = withTheme(styled.header`
  display: flex;
  align-items: center;
  position: sticky;
  top: 12px;
  width: 100%;
  max-width: 1100px;
  height: 75px;
  margin: 0 auto 96px auto;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 20px;
  background-color: var(--navbar);

  visibility: ${(p) => (p.isNavbarHidden ? 'hidden' : 'visible')};
  transform: ${(p) =>
    p.isNavbarHidden ? `translateY(-75px) translateY(-10px) translateZ(0) scale(1)` : 'translateY(0) translateZ(0) scale(1)'};
  backface-visibility: hidden;
  transition-property: transform, visibility, height;
  transition-duration: 0.15s;
  transition-timing-function: ease-in-out;

  z-index: 1000;

  @media (max-width: 80em) {
    width: 95%;
  }

  @media (max-width: 48em) {
    margin: 0 auto 60px auto;
  }
`)

const Content = withTheme(styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 48px;

  @media (max-width: 48em) {
    padding: 0 6px;
    justify-content: flex-start;

    .color-switcher-wrapper {
      margin-left: auto;
    }
  }
`)

const HamburgerMenuWrapper = withTheme(styled.div`
  display: none;
  @media (max-width: 48em) {
    display: block;
    line-height: 1;
  }
`)

const NavigationWrapper = withTheme(styled.div`
  display: block;
  @media (max-width: 48em) {
    display: none;
  }
`)
