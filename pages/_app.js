import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import Footer from 'components/Footer'
import { GlobalStyle } from 'components/GlobalStyles'
import Navbar from 'components/Navbar'
import NavigationDrawer from 'components/NavigationDrawer'
import PageTransition from 'components/PageTransition'
import { ThemeContextProvider } from 'contexts/theme.context'
import { EnvVars } from 'env'
import { theme } from 'theme'
import { initColorModeScript } from 'utils/initColorMode'

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
  { title: 'Snippets', href: '/snippets' },
]

const standalonePaths = []

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const isStandalone = standalonePaths.includes(router.pathname)
  const standaloneMarkup = <Component {...pageProps} />

  const contentMarkup = (
    <>
      <NavigationDrawer items={navItems}>
        <Navbar items={navItems} />
      </NavigationDrawer>
      <PageTransition>{standaloneMarkup}</PageTransition>
      {!isStandalone && <Footer />}
    </>
  )

  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" href={EnvVars.URL + 'rss'} title="RSS 2.0" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
          ga('create', 'UA-117119829-1', 'auto');
          ga('send', 'pageview');`,
          }}
        />
      </Head>
      <script dangerouslySetInnerHTML={{ __html: initColorModeScript }} />
      <ThemeContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {isStandalone ? standaloneMarkup : contentMarkup}
        </ThemeProvider>
      </ThemeContextProvider>
      <script defer src="https://www.google-analytics.com/analytics.js"></script>
    </>
  )
}

export default MyApp
