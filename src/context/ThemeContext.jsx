import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext(null)

export const PALETTES = [
  { id: '1', name: 'Ocean Blue',    swatch: '#1E3A8A' },
  { id: '2', name: 'Emerald Teal',  swatch: '#115e59' },
  { id: '3', name: 'Royal Purple',  swatch: '#5b21b6' },
  { id: '4', name: 'Forest Green',  swatch: '#166534' },
  { id: '5', name: 'Rose Red',      swatch: '#9f1239' },
]

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [palette, setPaletteState] = useState(
    () => localStorage.getItem('palette') || '1'
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    PALETTES.forEach(p => document.documentElement.classList.remove(`palette-${p.id}`))
    document.documentElement.classList.add(`palette-${palette}`)
    localStorage.setItem('palette', palette)
  }, [palette])

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggle: () => setIsDark(d => !d),
      palette,
      setPalette: setPaletteState,
      palettes: PALETTES,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}
