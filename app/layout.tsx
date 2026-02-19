import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import LayoutClient from '@/components/LayoutClient'
import RoleCheck from '@/components/RoleCheck'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '@/components/ThemeProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'ShelfWise - Smart Shopping Experience',
  description: 'Discover amazing products with ShelfWise - Your trusted online marketplace',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  const initialTheme = theme || systemTheme;
                  if (initialTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ClerkProvider
          appearance={{
            elements: {
              modalBackdrop: 'backdrop-blur-xl bg-black/60',
              card: 'shadow-2xl',
              rootBox: 'w-full',
              modalContent: 'rounded-2xl',
              cardBox: 'rounded-2xl',
            },
            variables: {
              colorPrimary: '#8B5CF6',
              colorBackground: '#ffffff',
              colorText: '#1e293b',
              borderRadius: '1rem',
            },
          }}
        >
          <ThemeProvider>
            <RoleCheck>
              <LayoutClient>{children}</LayoutClient>
            </RoleCheck>
            <Toaster position="top-right" />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}