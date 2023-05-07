/* eslint-disable @next/next/no-css-tags */
import '../public/fonts/style.css'
import 'intersection-observer'

import { Partytown } from '@builder.io/partytown/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider as ReactWrapBalancerProvider } from 'react-wrap-balancer'
import Footer from 'components/Footer'
import { GlobalStyle } from 'components/GlobalStyles'
import Navbar from 'components/Navbar'
import NavigationDrawer from 'components/NavigationDrawer'
import PageTransition from 'components/PageTransition'
import { ThemeContextProvider } from 'contexts/theme.context'
import { EnvVars } from 'env'
import { theme, ThemeProvider } from 'theme'

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
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

  const partytownScripts = (
    <>
      <Partytown
        forward={['dataLayer.push', 'fbq']}
        resolveUrl={(url) => {
          if (['connect.facebook.net', 'www.googletagmanager.com', 'www.google-analytics.com'].includes(url.hostname)) {
            // eslint-disable-next-line no-restricted-globals
            const proxyUrl = new URL(`${self.location.origin}/api/cors-proxy`)
            proxyUrl.searchParams.append('url', url.href)
            return proxyUrl
          }

          return url
        }}
      />

      <script
        type="text/partytown"
        defer
        dangerouslySetInnerHTML={{
          __html: `const e=document.createElement("script");e.src="https://bstefanski.com/adblockcansuckmyballs.js",e.setAttribute("defer",""),e.setAttribute("data-ackee-server","https://analytics.bstefanski.com"),e.setAttribute("data-ackee-domain-id","35ab507c-7c37-423e-8614-1e6c223809fe"),document.head.appendChild(e);`,
        }}
      />
    </>
  )

  return (
    <>
      <Head>
        <link rel="preload" href="/fonts/rubik-v20-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/rubik-v20-latin-700.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="alternate" type="application/rss+xml" href={EnvVars.URL + 'rss'} title="RSS 2.0" />
        {partytownScripts}
      </Head>
      <ThemeContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <ReactWrapBalancerProvider>{isStandalone ? standaloneMarkup : contentMarkup}</ReactWrapBalancerProvider>
        </ThemeProvider>
      </ThemeContextProvider>
    </>
  )
}

export default MyApp
