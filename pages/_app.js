import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import ClientOnly from 'components/ClientOnly'
import Footer from 'components/Footer'
import { GlobalStyle } from 'components/GlobalStyles'
import Navbar from 'components/Navbar'
import NavigationDrawer from 'components/NavigationDrawer'
import { ThemeContextProvider } from 'contexts/theme.context'
import { EnvVars } from 'env'
import { useBoolean } from 'hooks/useBoolean'
import useDeviceType from 'hooks/useDeviceType'
import { theme } from 'theme'
import { initColorModeScript } from 'utils/initColorMode'
import { initSecretMessageScript } from 'utils/initSecretMessage'

const PolishCowWidget = dynamic(() => import('components/PolishCowWidget'), { ssr: false })
const PolishCowOverlay = dynamic(() => import('components/PolishCowOverlay'), { ssr: false })

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
  { title: 'Snippets', href: '/snippets' },
]

const standalonePaths = ['/memes', '/about-me', '/resume']

function MyApp({ Component, pageProps }) {
  const [isPolishCowOverlayVisible, { on, off }] = useBoolean()
  const router = useRouter()
  const { isMobile } = useDeviceType()

  const isStandalone = standalonePaths.includes(router.pathname)
  const standaloneMarkup = <Component {...pageProps} />

  const contentMarkup = isPolishCowOverlayVisible ? (
    <PolishCowOverlay onClose={off} />
  ) : (
    <>
      <NavigationDrawer items={navItems}>
        <Navbar items={navItems} />
      </NavigationDrawer>
      {standaloneMarkup}
      {!isStandalone && <Footer />}
      <ClientOnly>{isMobile && <PolishCowWidget onClick={on} />}</ClientOnly>
    </>
  )

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" href={EnvVars.URL + 'rss'} title="RSS 2.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-117119829-1', 'auto');
          ga('send', 'pageview');`,
          }}
        />
        <script async src="https://www.google-analytics.com/analytics.js"></script>
      </Head>
      <script dangerouslySetInnerHTML={{ __html: initColorModeScript }} />
      <script async dangerouslySetInnerHTML={{ __html: initSecretMessageScript }} />
      <ThemeContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {isStandalone ? standaloneMarkup : contentMarkup}
        </ThemeProvider>
      </ThemeContextProvider>
    </>
  )
}

export default MyApp
