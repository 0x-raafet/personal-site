// const initColorModeScript = `
// const selectedColorMode = localStorage.getItem("colorMode");

// if (!selectedColorMode) {
//   setupPreferredColorMode();
//   window.colorMode = window.prefersDarkMode ? "dark" : "light";
// } else {
//   window.colorMode = selectedColorMode;
// }

// appendThemeClassName(window.colorMode)

// function setupPreferredColorMode() {
//   const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//   window.prefersDarkMode = darkModeMediaQuery.matches
// }

// function appendThemeClassName(colorMode) {
//   window.document.querySelector('body').classList.remove("light-theme");
//   window.document.querySelector('body').classList.remove("dark-theme");
//   window.document.querySelector('body').classList.add(colorMode + "-theme")
// }
// `

export const initColorModeScript = `const selectedColorMode=localStorage.getItem("colorMode");function setupPreferredColorMode(){const e=window.matchMedia("(prefers-color-scheme: dark)");window.prefersDarkMode=e.matches}function appendThemeClassName(e){window.document.querySelector("body").classList.remove("light-theme"),window.document.querySelector("body").classList.remove("dark-theme"),window.document.querySelector("body").classList.add(e+"-theme")}selectedColorMode?window.colorMode=selectedColorMode:(setupPreferredColorMode(),window.colorMode=window.prefersDarkMode?"dark":"light"),appendThemeClassName(window.colorMode);`
