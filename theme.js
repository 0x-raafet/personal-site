import { invert, lighten } from 'polished'

export const lightTheme = {
  colors: {
    primary: 'var(--primary)',
    secondary: 'var(--secondary)',
    text: 'var(--text)',
    textLighter: 'var(--textLighter)',
  },
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
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
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
    navbar: '1000',
  },
}
