'use client'

import { useAuth } from '@clerk/nextjs'
import FloatingNavbar from '@/components/FloatingNavbar'
import Footer from '@/components/Footer'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      {isSignedIn && <FloatingNavbar />}
      <main className="flex-1">{children}</main>
      {isSignedIn && <Footer />}
    </div>
  )
}
