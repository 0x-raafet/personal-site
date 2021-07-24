import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import Navbar from 'components/Navbar'
import { theme } from 'theme'
import { GlobalStyle } from 'components/GlobalStyles'
import { initColorModeScript } from 'utils/initColorMode'
import { initSecretMessageScript } from 'utils/initSecretMessage'
import PolishCowWidget from 'components/PolishCowWidget'
import { useBoolean } from 'hooks/useBoolean'
import dynamic from 'next/dynamic'

const PolishCowOverlay = dynamic(() => import('components/PolishCowOverlay'))

const themes = `
.light-theme {
  --background: hsl(228, 100%, 99%);
  --text: var(--gray-800);
  --text-lighter: var(--gray-600);
  --heading: var(--gray-900);
  --tint-primary: var(--tint-blue);
  --navbar: var(--gray-50);
  --overlay: var(--gray-400);
  --overlay-lighter: var(--gray-300);
  --primary: #c08b30;
}

.dark-theme {
  --background: hsl(220, 26%, 14%);
  --text: var(--gray-100);
  --text-ligher: var(--gray-300);
  --heading: var(--gray-50);
  --tint-primary: var(--tint-blue);
  --navbar: hsl(218, 23%, 23%);
  --overlay: var(--gray-800);
  --overlay-lighter: var(--gray-700);
  --primary: #81a1c1;
}

:root {
  --gray-900: hsl(230, 60%, 16%);
  --gray-800: hsl(228, 18%, 34%);
  --gray-700: hsl(230, 14%, 48%);
  --gray-600: hsl(230, 19%, 63%);
  --gray-500: hsl(231, 20%, 80%);
  --gray-400: hsl(231, 20%, 87%);
  --gray-300: hsl(228, 25%, 92%);
  --gray-200: hsl(225, 29%, 95%);
  --gray-100: hsl(228, 29%, 97%);
  --gray-50: hsl(220, 37%, 97%);

  --blue-900: 	hsl(225, 67%, 12%);
  --blue-800: hsl(225, 67%, 24%);
  --blue-700: hsl(225, 66%, 36%);
  --blue-600: 	hsl(225, 67%, 48%);
  --blue-500: 	hsl(225, 100%, 60%);
  --blue-400: 	hsl(225, 100%, 68%);
  --blue-300: 	hsl(225, 100%, 76%);
  --blue-200: 	hsl(225, 100%, 84%);
  --blue-100: 	hsl(225, 100%, 92%);
  --blue-50: hsl(225, 100%, 96%);

  --red-900: 	hsl(0, 52%, 32%);
  --red-800: 	hsl(0, 51%, 43%);
  --red-700: 	hsl(0, 61%, 54%);
  --red-600: hsl(0, 73%, 75%);
  --red-500: 	hsl(0, 72%, 92%);
  --red-400: 	hsl(0, 69%, 97%);

  --green-900: 	hsl(158, 41%, 11%);
  --green-800: 	hsl(158, 39%, 21%);
  --green-700: 	hsl(158, 40%, 32%);
  --green-600: 	hsl(157, 39%, 43%);
  --green-500: 	hsl(158, 45%, 53%);
  --green-400: 	hsl(157, 45%, 63%);
  --green-300: 	hsl(158, 44%, 72%);
  --green-200: hsl(158, 45%, 81%);
  --green-100: 	hsl(158, 46%, 91%);
  --green-50: 	hsl(150, 43%, 97%);

  --tint-blue: 	hsl(225, 100%, 98%);
  --tint-green: 	hsl(150, 43%, 97%);
}
`

function MyApp({ Component, pageProps }) {
  const [isPolishCowOverlayVisible, { on, off }] = useBoolean()

  const contentMarkup = isPolishCowOverlayVisible ? (
    <PolishCowOverlay onClose={off} />
  ) : (
    <>
      <Navbar />
      <Component {...pageProps} />
      <PolishCowWidget onClick={on} />
    </>
  )

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;400;600&display=swap" rel="stylesheet" />
      </Head>
      <style dangerouslySetInnerHTML={{ __html: themes }} />
      <script dangerouslySetInnerHTML={{ __html: initColorModeScript }} />
      <script async dangerouslySetInnerHTML={{ __html: initSecretMessageScript }} />
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {contentMarkup}
      </ThemeProvider>
    </>
  )
}

export default MyApp
