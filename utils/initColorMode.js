// const initColorModeScript = `
// const selectedColorMode = localStorage.getItem('colorMode')

// if (!selectedColorMode) {
//   setupPreferredColorMode()
//   if (window.prefersDarkMode === null) {
//     window.colorMode = 'dark'
//     return
//   }

//   window.colorMode = window.prefersDarkMode ? 'dark' : 'light'
// } else {
//   window.colorMode = selectedColorMode
// }

// appendThemeClassName(window.colorMode)

// function setupPreferredColorMode() {
//   const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
//   const lightModeMediaQuery = window.matchMedia('(prefers-color-scheme: light)')
//   window.prefersDarkMode = darkModeMediaQuery.matches ? true : lightModeMediaQuery ? false : null
// }

// function appendThemeClassName(colorMode) {
//   window.document.querySelector('body').classList.remove('light-theme')
//   window.document.querySelector('body').classList.remove('dark-theme')
//   window.document.querySelector('body').classList.add(colorMode + '-theme')
// }
// `

export const initColorModeScript = `const selectedColorMode=localStorage.getItem('colorMode');if(!selectedColorMode){setupPreferredColorMode();if(window.prefersDarkMode===null){window.colorMode='dark';return}window.colorMode=window.prefersDarkMode?'dark':'light'}else{window.colorMode=selectedColorMode}appendThemeClassName(window.colorMode);function setupPreferredColorMode(){const darkModeMediaQuery=window.matchMedia('(prefers-color-scheme: dark)');const lightModeMediaQuery=window.matchMedia('(prefers-color-scheme: light)');window.prefersDarkMode=darkModeMediaQuery.matches?true:lightModeMediaQuery?false:null}function appendThemeClassName(colorMode){window.document.querySelector('body').classList.remove('light-theme');window.document.querySelector('body').classList.remove('dark-theme');window.document.querySelector('body').classList.add(colorMode+'-theme')}`
