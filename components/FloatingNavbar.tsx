'use client'

import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ShoppingCart, Heart, Search, Menu, Package, LayoutDashboard, Users, ShoppingBag, FolderTree, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import ThemeToggle from './ThemeToggle'
import ClientOnly from './ClientOnly'
import { useAuth } from '@clerk/nextjs'
import { usersApi } from '@/lib/api'

export default function FloatingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const { getToken } = useAuth()

  useEffect(() => {
    checkUserRole()
  }, [])

  const checkUserRole = async () => {
    try {
      const token = await getToken()
      if (!token) return

      const userData = await usersApi.getCurrentUser(token) as any
      setIsAdmin(userData.role === 'admin')
    } catch (error) {
      console.error('Failed to check user role:', error)
    }
  }

  return (
    <>
      {/* Spacer to prevent content from going under navbar */}
      <div className="h-24" />
      
      <nav className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-7xl">
        <div className="rounded-2xl border border-border bg-background/80 backdrop-blur-xl shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                <Package className="h-6 w-6 text-primary" />
                <span className="hidden sm:block">
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
                {isAdmin && (
                  <>
                    <Link
                      href="/admin"
                      className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/products/new"
                      className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add Product
                    </Link>
                  </>
                )}
              </div>

              {/* Search Bar */}
              <div className="hidden flex-1 max-w-md mx-8 lg:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="h-10 w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-3">
                <ClientOnly>
                  <ThemeToggle />
                </ClientOnly>
                <Link
                  href="/wishlist"
                  className="relative rounded-xl p-2 transition-colors hover:bg-accent"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  href="/cart"
                  className="relative rounded-xl p-2 transition-colors hover:bg-accent"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Link>
                <UserButton afterSignOutUrl="/" />
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="rounded-xl p-2 transition-colors hover:bg-accent md:hidden"
                >
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-border bg-background/95 backdrop-blur-xl shadow-lg md:hidden">
            <div className="px-4 py-4">
              <div className="flex flex-col gap-2">
                <Link
                  href="/products"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  Categories
                </Link>
                <Link
                  href="/orders"
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  Orders
                </Link>
                {isAdmin && (
                  <>
                    <div className="my-2 border-t border-border" />
                    <Link
                      href="/admin"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent flex items-center gap-2"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/products/new"
                      onClick={() => setMobileMenuOpen(false)}
                      className="rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent flex items-center gap-2"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      Add Product
                    </Link>
                  </>
                )}
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search products..."
                    className="h-10 w-full rounded-xl border border-border bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:border-primary"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
