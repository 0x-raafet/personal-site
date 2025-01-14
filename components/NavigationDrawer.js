import * as OriginalDrawer from '@accessible/drawer'
import { styled } from '@linaria/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { withTheme } from 'theme'
import ClientOnly from './ClientOnly'
import CloseIcon from './icons/CloseIcon'

export default function NavigationDrawer({ children, items }) {
  return (
    <OriginalDrawer.Drawer>
      <Wrapper>
        <ClientOnly>
          <OriginalDrawer.Target openClass="drawer-opened" closedClass="drawer-closed">
            <div className="my-drawer">
              <div className="my-drawer-container">
                <DrawerCloseButton />
                <NavItems items={items} />
              </div>
            </div>
          </OriginalDrawer.Target>
        </ClientOnly>
      </Wrapper>
      {children}
    </OriginalDrawer.Drawer>
  )
}

function NavItems({ items }) {
  const { close } = OriginalDrawer.useDrawer()
  const router = useRouter()

  useEffect(() => {
    function handleRouteChangeComplete() {
      close()
    }

    router.events.on('routeChangeComplete', handleRouteChangeComplete)
    return () => router.events.off('routeChangeComplete', handleRouteChangeComplete)
  }, [close, router])

  return (
    <ul>
      {items.map((singleItem, idx) => {
        return (
          <NavItem key={idx}>
            <NextLink prefetch={false} href={singleItem.href} legacyBehavior>
              {singleItem.title}
            </NextLink>
          </NavItem>
        )
      })}
    </ul>
  )
}

function DrawerCloseButton() {
  const ref = useRef(null)
  const a11yProps = OriginalDrawer.useA11yCloseButton(ref)

  return <CloseIcon className="close-icon" _ref={ref} {...a11yProps} />
}

const Wrapper = withTheme(styled.div`
  .my-drawer {
    width: 100%;
    height: 100%;
    z-index: 9999;
    background: var(--background);
    transition: margin-left 0.3s cubic-bezier(0.82, 0.085, 0.395, 0.895);
    overflow: hidden;
  }

  .my-drawer-container {
    position: relative;
    height: 100%;
    margin: auto;
    max-width: 900px;
    padding: 0 12px;
  }

  .close-icon {
    position: absolute;
    right: 24px;
    top: 24px;
  }

  .drawer-closed {
    margin-left: -100%;
  }

  .drawer-opened {
    margin-left: 0;
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style: none;

    & > *:not(:first-child) {
      margin-top: 48px;
    }
  }
`)

const NavItem = withTheme(styled.li`
  a {
    font-size: 32px;
    text-transform: uppercase;
    display: block;
    color: currentColor;
    text-decoration: none;
    border-radius: 5px;
    padding: 5px 10px;
  }
`)
