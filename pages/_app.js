/* eslint-disable @next/next/no-css-tags */
import '../public/fonts/style.css'

import { Partytown } from '@builder.io/partytown/react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Footer from 'components/Footer'
import { GlobalStyle } from 'components/GlobalStyles'
import Navbar from 'components/Navbar'
import NavigationDrawer from 'components/NavigationDrawer'
import { ThemeContextProvider } from 'contexts/theme.context'
import { EnvVars } from 'env'
import { theme, ThemeProvider } from 'theme'

const navItems = [
  { title: 'Home', href: '/' },
  { title: 'Blog', href: '/blog' },
]

const standalonePaths = []

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  const isStandalone = standalonePaths.includes(router.pathname)
  const standaloneMarkup = <Component {...pageProps} />

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
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5877HF4');`,
        }}
      />
    </>
  )

  const contentMarkup = (
    <>
      <NavigationDrawer items={navItems}>
        <Navbar items={navItems} />
      </NavigationDrawer>
      {standaloneMarkup}
      {!isStandalone && <Footer />}
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
          {isStandalone ? standaloneMarkup : contentMarkup}
        </ThemeProvider>
      </ThemeContextProvider>
    </>
  )
}

export default MyApp
