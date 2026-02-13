'use client'

import { useEffect } from 'react'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 inline-flex rounded-full bg-destructive/10 p-6">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </div>
        <h1 className="mb-4 text-2xl font-bold">Something went wrong!</h1>
        <p className="mb-8 text-muted-foreground">
          We encountered an error while processing your request. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex h-11 items-center justify-center rounded-lg bg-primary px-6 font-medium text-primary-foreground transition-all hover:bg-primary/90"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
