import { createTheming } from '@callstack/react-theme-provider'
import { invert, lighten } from 'polished'

// theming.js

export const theme = {
  spacings: {
    '2xs': 6,
    xs: 12,
    sm: 24,
    md: 48,
    lg: 96,
    xl: 192,
    smallContainer: 700,
    mediumContainer: 900,
    largeContainer: 1100,
  },
  fontSizes: {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    '2xl': 22,
    '3xl': 28,
    '4xl': 32,
    '5xl': 40,
    '6xl': 48,
  },
  breakpoints: {
    base: '0em',
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  },
  zIndexes: {
    reactionsWidget: '999',
    navbar: '1000',
    drawer: '9999',
  },
}
const { ThemeProvider, withTheme } = createTheming(theme)

export { ThemeProvider, withTheme }
