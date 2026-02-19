'use client'

import { useAuth } from '@clerk/nextjs'
import FloatingNavbar from '@/components/FloatingNavbar'
import Footer from '@/components/Footer'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth()

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      {/* Universal app background - grid pattern + gradient */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-br from-background via-primary/5 to-background pointer-events-none" />
      
      <div className="relative flex min-h-screen w-full flex-col">
        {isSignedIn && <FloatingNavbar />}
        <main className="relative flex-1">{children}</main>
        {isSignedIn && <Footer />}
      </div>
    </div>
  )
}
