'use client'

import Link from 'next/link'
import { ShoppingCart, Heart, Search, Menu, Package } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import UserMenu from './UserMenu'
import ClientOnly from './ClientOnly'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-glow">
              <span className="text-foreground">Shelf</span>
              <span className="text-primary">Wise</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Categories
            </Link>
            <Link
              href="/orders"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Orders
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden flex-1 max-w-md mx-8 lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ClientOnly>
              <ThemeToggle />
            </ClientOnly>
            <Link
              href="/wishlist"
              className="relative rounded-lg p-2 transition-colors hover:bg-accent"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                0
              </span>
            </Link>
            <Link
              href="/cart"
              className="relative rounded-lg p-2 transition-colors hover:bg-accent"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                0
              </span>
            </Link>
            <ClientOnly>
              <UserMenu />
            </ClientOnly>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg p-2 transition-colors hover:bg-accent md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            'overflow-hidden transition-all md:hidden',
            mobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          )}
        >
          <div className="flex flex-col gap-2 pt-4">
            <Link
              href="/products"
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Products
            </Link>
            <Link
              href="/categories"
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Categories
            </Link>
            <Link
              href="/orders"
              className="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
              Orders
            </Link>
            <div className="relative mt-2 px-4">
              <Search className="absolute left-7 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search products..."
                className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
