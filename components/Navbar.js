import * as Drawer from '@accessible/drawer'
import { styled } from '@linaria/react'
import throttle from 'lodash/throttle'
import NextLink from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { withTheme } from 'theme'
import { HamburgerIcon } from './icons/HamburgerIcon'
import Logotype from './Logotype'
import Navigation from './Navigation'

export default function Navbar({ items }) {
  const { toggle, isOpen: isMenuDrawerOpen } = Drawer.useDrawer()

  const prevScrollPos = useRef(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollPos = window.pageYOffset

      const isVisible = isMenuDrawerOpen ? true : prevScrollPos.current > currentScrollPos
      setVisible(currentScrollPos <= 100 || (prevScrollPos.current > 100 && isVisible))

      prevScrollPos.current = currentScrollPos
    }, 32)

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMenuDrawerOpen])

  return (
    <Container isNavbarHidden={!visible}>
      <Content>
        <NextLink href="/" prefetch={false} passHref legacyBehavior>
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
  )
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
