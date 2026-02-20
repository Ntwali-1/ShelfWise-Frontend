'use client'

import { useAuth, useUser, useClerk } from '@clerk/nextjs'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User,
  Settings,
  Package,
  Heart,
  ShoppingCart,
  LogOut,
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  Shield,
} from 'lucide-react'
import { profileApi } from '@/lib/api'

export default function UserMenu() {
  const { getToken } = useAuth()
  const { user } = useUser()
  const { signOut } = useClerk()
  const [isOpen, setIsOpen] = useState(false)
  const [profile, setProfile] = useState<any>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken()
        if (!token) return
        const data = await profileApi.get(token)
        setProfile(data)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user, getToken])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSignOut = () => {
    signOut()
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      {/* User Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-accent"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white font-semibold text-sm">
          {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0].toUpperCase()}
        </div>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 rounded-xl border border-border bg-card shadow-2xl z-50"
          >
            {/* Profile Header */}
            <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-purple-50/20 dark:from-primary/5 dark:to-purple-900/10 rounded-t-xl">
              <div className="flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-600 text-white font-bold text-lg flex-shrink-0">
                  {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-foreground truncate">
                    {profile?.firstName && profile?.lastName
                      ? `${profile.firstName} ${profile.lastName}`
                      : user?.fullName || 'User'}
                  </div>
                  <div className="text-sm text-muted-foreground truncate">
                    {user?.emailAddresses[0]?.emailAddress}
                  </div>
                  {profile?.phoneNumber && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <Phone className="h-3 w-3" />
                      {profile.phoneNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Info */}
              {profile && (
                <div className="mt-3 space-y-1">
                  {profile.address && (
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
                      <span className="line-clamp-1">{profile.address}</span>
                    </div>
                  )}
                  {profile.bio && (
                    <div className="text-xs text-muted-foreground italic line-clamp-2 mt-2">
                      "{profile.bio}"
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <Link
                href="/profile"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent group"
              >
                <User className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/orders"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent group"
              >
                <Package className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>My Orders</span>
              </Link>

              <Link
                href="/wishlist"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent group"
              >
                <Heart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>Wishlist</span>
              </Link>

              <Link
                href="/cart"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent group"
              >
                <ShoppingCart className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>Shopping Cart</span>
              </Link>

              <Link
                href="/settings"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent group"
              >
                <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                <span>Settings</span>
              </Link>
            </div>

            {/* Sign Out */}
            <div className="p-2 border-t border-border">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-destructive/10 text-destructive group"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
