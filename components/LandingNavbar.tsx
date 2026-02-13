'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Menu, X } from 'lucide-react'
import { SignInButton } from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'

const navItems = [
  { name: 'Home', href: '#hero' },
  { name: 'Features', href: '#features' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
]

export default function LandingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        className={cn(
          'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300',
          'w-[95%] max-w-6xl'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className={cn(
            'rounded-full border transition-all duration-300',
            isScrolled
              ? 'bg-background/80 backdrop-blur-xl shadow-lg border-border/50'
              : 'bg-background/60 backdrop-blur-md border-border/30'
          )}
        >
          <div className="flex items-center justify-between px-6 py-3">
            {/* Logo */}
            <motion.a
              href="#hero"
              className="flex items-center text-lg font-bold text-primary"
              whileHover={{ scale: 1.05 }}
            >
              <Package className="mr-2 h-5 w-5" />
              <span className="text-glow">
                <span className="text-foreground">Shelf</span>Wise
              </span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.a
                  href={item.href}
                  key={item.name}
                  className={cn(
                    'text-sm font-medium transition-all duration-300 relative',
                    activeSection === item.href.substring(1)
                      ? 'text-primary'
                      : 'text-foreground/70 hover:text-primary'
                  )}
                  whileHover={{ y: -2 }}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      layoutId="activeSection"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <SignInButton mode="modal">
                <motion.button
                  className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
              </SignInButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <motion.button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="text-foreground z-50"
                aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className={cn(
          'fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center md:hidden',
          isMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col space-y-8 text-xl">
          {navItems.map((item, index) => (
            <motion.a
              href={item.href}
              key={item.name}
              className="text-foreground/80 hover:text-primary transition-colors duration-300 text-center"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
              transition={{ delay: index * 0.1 }}
            >
              {item.name}
            </motion.a>
          ))}
          <SignInButton mode="modal">
            <motion.button
              className="cosmic-button w-full"
              onClick={() => setIsMenuOpen(false)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : 20 }}
              transition={{ delay: navItems.length * 0.1 }}
            >
              Sign In
            </motion.button>
          </SignInButton>
        </div>
      </motion.div>
    </>
  )
}
