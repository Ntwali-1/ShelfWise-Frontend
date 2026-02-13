'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full bg-primary/10 p-2" />
    )
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative h-10 w-10 rounded-full bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Moon className="h-full w-full" />
        ) : (
          <Sun className="h-full w-full" />
        )}
      </motion.div>
    </motion.button>
  )
}
