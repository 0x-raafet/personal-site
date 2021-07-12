import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { invert, lighten } from 'polished'
import Navbar from 'components/Navbar'
import { lightTheme } from 'theme'

const GlobalStyle = createGlobalStyle`
/* Box sizing rules */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margin */
body,
h1,
h2,
h3,
h4,
p,
figure,
blockquote,
dl,
dd {
  margin: 0;
}

/* Remove list styles on ul, ol elements with a list role, which suggests default styling will be removed */
ul[role='list'],
ol[role='list'] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
} 

/* Set core body defaults */
body {
  min-height: 100vh;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
  font-family: 'Barlow', sans-serif;
  color: ${(p) => p.theme.colors.text};
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture {
  max-width: 100%;
  display: block;
}

/* Inherit fonts for inputs and buttons */
input,
button,
textarea,
select {
  font: inherit;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }
  
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`

function convertObjectToThemeValues(obj) {
  let paths = []
  flattenObjectToPath(obj)
  function flattenObjectToPath(value, path = '') {
    if (typeof value === 'object') {
      const keys = Object.keys(value)
      keys.forEach((singleKey) => flattenObjectToPath(value[singleKey], (!!path ? path + '-' : path) + singleKey))
    } else {
      paths = [...paths, [path, value]]
    }
  }
  return paths
}

const colorModeScript = `
  const selectedColorMode = localStorage.getItem("colorMode");

  if (!selectedColorMode) {
    setupPreferredColorMode();
    window.colorMode = window.prefersDarkMode ? "dark" : "light";
  } else {
    window.colorMode = selectedColorMode;
  }

  appendThemeClassName(window.colorMode)

  function setupPreferredColorMode() {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    window.prefersDarkMode = darkModeMediaQuery.matches
  }

  function appendThemeClassName(colorMode) {
    window.document.querySelector('body').classList.add(colorMode + "-theme")
  }
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;400;600&display=swap" rel="stylesheet" />
      </Head>
      <style
        dangerouslySetInnerHTML={{
          __html: `
.light-theme {
--primary: #ffffff;
--secondary: #282A3E;
--text: #282A3E;
--textLighter: ${lighten(0.25, '#282A3E')};
}

.dark-theme {
--primary: ${invert('#ffffff')};
--secondary: ${invert('#282A3E')};
--text: ${invert('#282A3E')};
--textLighter: ${lighten(0.25, '#282A3E')};
}
           `,
        }}
      />

      {/* <script dangerouslySetInnerHTML={{ __html: cssVariablesScript(lightTheme.colors, darkTheme.colors) }} /> */}
      <script dangerouslySetInnerHTML={{ __html: colorModeScript }} />
      <ThemeProvider theme={lightTheme}>
        <div style={{ height: '300vh' }}>
          <Navbar />
          <GlobalStyle />
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  )
}

export default MyApp
