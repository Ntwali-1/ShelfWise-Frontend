'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Moon,
  Sun,
  Mail,
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  Check,
  X,
} from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'
import Link from 'next/link'

export default function SettingsPage() {
  const { user } = useUser()
  const { theme, toggleTheme } = useTheme()
  const [activeTab, setActiveTab] = useState('account')

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: theme === 'dark' ? Moon : Sun },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
            {/* Sidebar */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <nav className="space-y-1 rounded-xl border border-border bg-card p-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === 'account' && <AccountSettings />}
              {activeTab === 'notifications' && <NotificationSettings />}
              {activeTab === 'security' && <SecuritySettings />}
              {activeTab === 'appearance' && <AppearanceSettings theme={theme} toggleTheme={toggleTheme} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AccountSettings() {
  const { user } = useUser()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-4">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">Email</label>
            <div className="mt-1 flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{user?.emailAddresses[0]?.emailAddress}</span>
              {user?.emailAddresses[0]?.verification?.status === 'verified' && (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                  <Check className="h-3 w-3" />
                  Verified
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Account ID</label>
            <div className="mt-1 font-mono text-sm text-muted-foreground">{user?.id}</div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Member Since</label>
            <div className="mt-1">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }) : 'N/A'}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
        <p className="text-muted-foreground mb-4">
          Manage your personal information and profile details
        </p>
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <User className="h-4 w-4" />
          Edit Profile
        </Link>
      </div>
    </motion.div>
  )
}

function NotificationSettings() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [orderUpdates, setOrderUpdates] = useState(true)
  const [promotions, setPromotions] = useState(false)
  const [newsletter, setNewsletter] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
      <div className="space-y-4">
        <ToggleSetting
          label="Email Notifications"
          description="Receive notifications via email"
          checked={emailNotifications}
          onChange={setEmailNotifications}
        />
        <ToggleSetting
          label="Order Updates"
          description="Get notified about your order status"
          checked={orderUpdates}
          onChange={setOrderUpdates}
        />
        <ToggleSetting
          label="Promotions & Deals"
          description="Receive special offers and discounts"
          checked={promotions}
          onChange={setPromotions}
        />
        <ToggleSetting
          label="Newsletter"
          description="Stay updated with our latest news"
          checked={newsletter}
          onChange={setNewsletter}
        />
      </div>
    </motion.div>
  )
}

function SecuritySettings() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-4">Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Password</div>
                <div className="text-sm text-muted-foreground">
                  Managed by Clerk authentication
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">
                  Add an extra layer of security
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/50 bg-destructive/5">
            <div>
              <div className="font-medium">Delete Account</div>
              <div className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </div>
            </div>
            <button className="rounded-lg bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function AppearanceSettings({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <h2 className="text-xl font-bold mb-4">Appearance</h2>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-3 block">Theme</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                theme === 'light'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Sun className="h-8 w-8" />
              <span className="font-medium">Light</span>
            </button>
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`flex flex-col items-center gap-3 rounded-lg border-2 p-4 transition-all ${
                theme === 'dark'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Moon className="h-8 w-8" />
              <span className="font-medium">Dark</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ToggleSetting({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-muted'
        }`}
      >
        <motion.div
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
          animate={{ x: checked ? 22 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  )
}
