'use client'

import { useAuth } from '@clerk/nextjs'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { isSignedIn } = useAuth()

  return (
    <div className="flex min-h-screen flex-col">
      {isSignedIn && <Navbar />}
      <main className="flex-1">{children}</main>
      {isSignedIn && <Footer />}
    </div>
  )
}
