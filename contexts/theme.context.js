import React, { useContext, useState } from 'react'

export const ThemeContext = React.createContext()

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(null)
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export function useThemeContext() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useThemeContext can only be used inside ThemeContextProvider')
  }
  return context
}
