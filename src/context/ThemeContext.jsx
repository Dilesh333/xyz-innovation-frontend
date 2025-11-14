"use client"

import { createContext, useState, useContext, useEffect } from "react"

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider")
  }
  return context
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") {
      return false
    }

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      try {
        return Boolean(JSON.parse(savedTheme))
      } catch {
      }
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
  })

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDark)
      localStorage.setItem("theme", JSON.stringify(isDark))
    }
  }, [isDark])

  const toggleTheme = () => {
    setIsDark((prev) => !prev)
  }

  return <ThemeContext.Provider value={{ isDark, toggleTheme }}>{children}</ThemeContext.Provider>
}
